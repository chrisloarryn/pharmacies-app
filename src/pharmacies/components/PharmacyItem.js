import React, { useState } from 'react'

import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button'
import Modal from '../../shared/components/UIElements/Modal'
import Map from '../../shared/components/UIElements/Map'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useHttpClient } from './../../shared/hooks/http-hook'
import './PharmacyItem.sass'

const PharmacyItem = (props) => {
  const { isLoading, error, clearError } = useHttpClient()
  const [showMap, setShowMap] = useState(false)

  const openMapHandler = () => setShowMap(true)

  const closeMapHandler = () => setShowMap(false)

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass='place-item__modal-content'
        footerClass='place-item__modal-actions'
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className='map-container'>
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>

      <li
        className='place-item'
        style={{ width: '20rem', marginLeft: '1rem', marginRight: '1rem' }}
      >
        <Card className='place-item__content'>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className='place-item__image'>
            <img
              src={`https://www.radioimagina.cl/wp-content/uploads/2016/07/remedios.jpg`}
              alt={props.title}
            />
          </div>
          <div className='place-item__info'>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.date}</p>
            <p>{props.phone}</p>
            <p>{props.hours}</p>
          </div>
          <div className='place-item__actions'>
            <Button inverse onClick={openMapHandler}>
              Ver en el Mapa
            </Button>
          </div>
        </Card>
      </li>
    </>
  )
}

export default PharmacyItem
