import React from 'react';
import NumericInput from '../NumericInput/NumericInput';

import s from './InputLifeSpan.module.css';

export default function InputLifeSpan({ lifespan, handleInput, handleCheck }) {
  return (
    <div className = {s.containerProperty}>

      <div 
        className = {`${s.containerNumericInput} ${!lifespan.enabled ? s.disabled : ''}`}
      >
        <NumericInput 
          number = {lifespan}
          handleInput = {handleInput}
          disableHundred = {true}
        />
      </div>

      <div className = {s.containerCheck}>
        <label className = {s.labelCheck}>Agregar</label>
        <input className = {s.check} type = 'checkbox' onChange = {handleCheck}/>
      </div>

      {
        !lifespan.enabled &&
        <div className = {s.blockInput}>
        </div>
      }

    </div>
  )
}