import React from 'react';
import NumericInput from '../NumericInput/NumericInput';

import s from './InputLifeSpan.module.css';

export default function InputLifeSpan({ lifespan, property, handleInput, handleCheck }) {
  return (
    <div className = {s.containerProperty}>

      <div className = {s.containerlabelProperty}>
        <label className = {s.labelProperty}>{lifespan.clientName}</label>
      </div>

      <div 
        className = {`${s.containerNumericInput} ${!lifespan.enabled ? s.disabled : ''}`}
      >
        <NumericInput 
          number = {lifespan}
          handleInput = {handleInput}
          disableHundred = {true}
          property = {property}
        />
      </div>

      <div className = {s.containerCheck}>
        <label className = {s.labelCheck}>Agregar</label>
        <input 
          className = {s.check} 
          type = 'checkbox' 
          onChange = {() => handleCheck(property)}
          checked = {lifespan.enabled}
        />
      </div>

      {
        !lifespan.enabled &&
        <div className = {s.blockInput}>
        </div>
      }

    </div>
  )
}