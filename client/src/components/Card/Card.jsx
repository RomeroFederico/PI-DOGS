import React from 'react';
import SmartImage from '../SmartImage/SmartImage';

import { getBreedSize, fitSentence } from '../../util';

import s from './Card.module.css';
import weight from '../../resources/weight.svg';

export default function Card({ id, nombre, temperamento, imagen, peso }) {

  let size = getBreedSize(peso[peso.length - 1]);

  return (
    <div className = {s.card}>
      <div className = {s.imageZone}>
        <SmartImage image = {imagen} alt = {nombre} key = {`smart-image-${id}`}/>
      </div>

      <div className = {s.mainZone}>

        <div className = {`center ${s.sizeBreed} COLOR${size}`}>{size}</div>
        <div className = {`center ${s.titleBreed} FONT${fitSentence(nombre)}`}>{nombre}</div>
        <div className = {`center ${s.temperaments}`}>{temperamento? temperamento : '-- No Info Available --'}</div>

      </div>

      <div className = {s.barZone}>
        <div className = {`center ${s.weigth} BG${size}`}>
          <span className = {s.textTitle}>{peso[1] ? <>{peso[0]} <i>kg</i></> : '-'}</span>
          <span className = {s.textInfo}>Minimo</span>
        </div>

        <div className = {`center ${s.weigth} ${s.mainSubTitle} BG${size}`}>
          <img src = {weight} alt = 'peso' className = {s.weigthIco}/>
        </div>

        <div className = {`center ${s.weigth} BG${size}`}>
          <span className = {s.textTitle}>{peso[1] ? peso[1] : peso[0]} <i>kg</i></span>
          <span className = {s.textInfo}>Maximo</span>
        </div>
      </div>

    </div>
  )
}