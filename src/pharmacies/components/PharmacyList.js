import React from 'react'

import Card from '../../shared/components/UIElements/Card'
import PharmacyItem from './PharmacyItem'
import Button from '../../shared/components/FormElements/Button'
import './PharmacyList.sass'
import { eachWord } from '../../shared/util/firstUppercase'

const PharmacyList = (props) => {
  if (props.items.length === 0) {
    return (
      <div style={{ width: '100%' }} className='pharmacy-list center'>
        <Card style={{ width: '100%' }}>
          <h2>No pharmacies found.</h2>
          <Button to='/pharmacies/new'>reload?</Button>
        </Card>
      </div>
    )
  }

  return (
    <ul className='pharmacy-list'>
      {props.items.map((pharmacy, idx) => {
        const split = (str) => (str.length > 1 ? str.split(' ')[0] : str)
        const coordinates = {
          lng: parseFloat(pharmacy.local_lng),
          lat: parseFloat(pharmacy.local_lat)
        }
        return (
          <PharmacyItem
            key={`${pharmacy.local_nombre}_00${idx + 1}`}
            id={pharmacy.id}
            image={pharmacy.image}
            title={eachWord(
              `${pharmacy.local_nombre} ${pharmacy.localidad_nombre}`
            )}
            date={`Día de turno: ${eachWord(pharmacy.funcionamiento_dia)} [${
              pharmacy.fecha
            }].`}
            phone={`Contacto: ${
              pharmacy.local_telefono.length > 5
                ? pharmacy.local_telefono
                : 'NO INFORMADO'
            }.`}
            hours={`Horario: ${split(
              pharmacy.funcionamiento_hora_apertura
            )} - ${split(pharmacy.funcionamiento_hora_cierre)} hrs.`}
            address={pharmacy.local_direccion}
            creatorId={pharmacy.creator}
            coordinates={coordinates}
            onDelete={props.onDeletePharmacy}
          />
        )
      })}
    </ul>
  )
}

export default PharmacyList
