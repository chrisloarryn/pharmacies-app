import React, { useState } from 'react'
import PharmacyList from '../components/PharmacyList'
import LoadingSpinner from './../../shared/components/UIElements/LoadingSpinner'
import Button from '../../shared/components/FormElements/Button'
import ErrorModal from './../../shared/components/UIElements/ErrorModal'

import Card from '../../shared/components/UIElements/Card'
import Input from './../../shared/components/FormElements/Input'
import { useForm } from './../../shared/hooks/form-hook'
import { VALIDATOR_MINLENGTH } from './../../shared/util/validators'
import { useHttpClient } from './../../shared/hooks/http-hook'

const Pharmacies = () => {
  const [loadedPlaces, setLoadedPlaces] = useState([])
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [formState, inputHandler] = useForm(
    {
      commune: {
        value: '',
        isValid: false
      },
      local: {
        value: '',
        isValid: false
      }
    },
    false
  )

  const placeDeletedHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    )
  }

  const pharmacySubmitHandler = async (event) => {
    event.preventDefault()
    try {
      const { commune, local } = formState.inputs
      const formData = new FormData()
      formData.append('commune', commune.value)
      formData.append('local', local.value)
      const fetchPlaces = async () => {
        try {
          // const proxy = 'https://cors-anywhere.herokuapp.com'
          const responseData = await sendRequest(
            `/https://farmanet.minsal.cl/maps/index.php/ws/getLocalesRegion?id_region=7`
          )

          const wit = new Set()
          responseData.map((i) => wit.add(i.local_nombre.trim()))
          console.log(wit)
          const data = responseData.filter(
            (item) =>
              item.comuna_nombre === commune.value.toUpperCase() &&
              item.local_nombre === local.value.toUpperCase()
          )
          setLoadedPlaces(data)
        } catch (err) {}
      }
      fetchPlaces()
    } catch (err) {}
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className='pharmacy-list center'>
        <Card style={{ width: '100%' }}>
          <form className='pharmacy-form' onSubmit={pharmacySubmitHandler}>
            <Input
              id='commune'
              element='input'
              label='Comuna'
              validators={[VALIDATOR_MINLENGTH(3)]}
              errorText='Por favor ingrese una comuna válida (3 caracteres al menos)'
              onInput={inputHandler}
            />
            <Input
              id='local'
              element='input'
              label='Nombre del Local'
              validators={[VALIDATOR_MINLENGTH(3)]}
              errorText='Por favor ingrese un local válido (3 caracteres al menos)'
              onInput={inputHandler}
            />
            <Button type='submit' disabled={!formState.isValid}>
              Buscar
            </Button>
          </form>
        </Card>
      </div>

      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <div>
          <PharmacyList
            items={loadedPlaces}
            onDeletePharmacy={placeDeletedHandler}
          />
        </div>
      )}
    </React.Fragment>
  )
}

export default Pharmacies
