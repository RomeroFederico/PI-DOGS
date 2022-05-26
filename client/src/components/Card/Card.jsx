import React from 'react';
import SmartImage from '../SmartImage/SmartImage';

import { getBreedSize, fitSentence, getType } from '../../util';

import s from './Card.module.css';
import Weight from '../SVG/Weight/Weight';
import DogFace from '../SVG/DogFace/DogFace';

export default function Card({ id, nombre, temperamento, imagen, peso }) {

  let size = getBreedSize(peso[peso.length - 1]);
  let type = getType(id);

  return (
    <div className = {s.card}>
      <div className = {`${s.typeZone}`}>
        <div className = {`center ${s.header} ${s.typeTitle} BG${size}`}>{type}</div>
        <div className = {`center ${s.header} BG${size}`}>
          {/*<img src = {dogFace} alt = 'peso' className = {s.dogIco}/>*/}
          <DogFace style = {s.dogIco}/>
        </div>
        <div className = {`center ${s.header} ${s.typeTitle} BG${size}`}>Nro: {id}</div>
      </div>
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

        <div className = {`center ${s.weigth} BG${size}`}>
          {/*<img src = {weight} alt = 'peso' className = {s.weigthIco}/>*/}
          <Weight style = {s.weigthIco} />
        </div>

        <div className = {`center ${s.weigth} BG${size}`}>
          <span className = {s.textTitle}>{peso[1] ? peso[1] : peso[0]} <i>kg</i></span>
          <span className = {s.textInfo}>Maximo</span>
        </div>
      </div>

    </div>
  )
}