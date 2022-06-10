import React from 'react';
import SmartImage from '../SmartImage/SmartImage';
import DisplayWeight from '../DisplayWeight/DisplayWeight';
import DisplayHeight from '../DisplayHeight/DisplayHeight';
import { getBreedSize } from '../../util';

import s from './MainZoneBreedDetails.module.css';

export default function MainZoneBreedDetails({ id, nombre, peso, altura, temperamento, añosDeVida, imagen }) {

  let size = getBreedSize(peso[peso.length - 1]);

  return (
    <>
      <div className = {s.containerImage}>
        <SmartImage image = {imagen} alt = {nombre} style = {`FILL${size}`} imageStyle = {s.image}/>
      </div>
      <div className = {s.infoZone}>
        <div className = {s.property}>
          <label className = {`${s.propertyName} COLOR${size}`}>Nombre</label>
          <h1 className = {s.propertyValue}>{nombre}</h1>
        </div>

        <div className = {s.property}>
          <label className = {`${s.propertyName} COLOR${size}`}>Temperamento</label>
          <h4 className = {`${s.propertyValue} ${s.temperaments}`}>
            {temperamento && temperamento !== '' ? temperamento : '-- No Info --'}
          </h4>
        </div>

        <div className = {s.displayInfoCharts}>

          <div className = {s.weightZone}>
            <DisplayWeight weight = {peso[peso.length - 1]} varSize = {s[size]}/>
          </div>

          <div className = {s.heightZone}>
            <DisplayHeight height = {altura[altura.length - 1]} varSize = {s[size]} size = {size}/>
          </div>

        </div>

        <div className = {s.properties}>
          <div className = {s.property}>
            <label className = {`${s.propertyName} COLOR${size}`}>Peso Min.</label>
            <h4 className = {s.propertyValue}>{peso[1] ? peso[0] + ' Kg' : '-'}</h4>
          </div>

          <div className = {s.property}>
            <label className = {`${s.propertyName} COLOR${size}`}>Peso Max.</label>
            <h4 className = {s.propertyValue}>{peso[1] ? peso[1] : peso[0]} Kg</h4>
          </div>

          <div className = {s.property}> 
            <label className = {`${s.propertyName} COLOR${size}`}>Años de Vida</label>
            <h4 className = {s.propertyValue}>{añosDeVida ? añosDeVida : '-- No Info --'}</h4>
          </div>

          <div className = {s.property}>
            <label className = {`${s.propertyName} COLOR${size}`}>Altura Min.</label>
            <h4 className = {s.propertyValue}>{altura[1] ? altura[0] + ' cm' : '-'}</h4>
          </div>

          <div className = {s.property}>
            <label className = {`${s.propertyName} COLOR${size}`}>Altura Max.</label>
            <h4 className = {s.propertyValue}>{altura[1] ? altura[1] : altura[0]} cm</h4>
          </div>
        </div>

      </div>
    </>
  );
}