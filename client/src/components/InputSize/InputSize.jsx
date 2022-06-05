import React from 'react';
import NumericInput from '../NumericInput/NumericInput';

import s from './InputSize.module.css';

export default function InputSize({ size, propertyName, handleInput, handleCheck }) {
  return (
    <div className = {s.containerProperty}>

      <label 
        className = {`${s.labelNameProperty} ${!size.required && !size.enabled ? s.disabled : ''}`}
      >
        {size.nombre} ({size.unidad})
      </label>

      <div 
        className = {`${s.containerNumericInput} ${!size.required && !size.enabled ? s.disabled : ''}`}
      >
        <NumericInput 
          number = {size}
          property = {propertyName}
          handleInput = {handleInput}
        />
      </div>

      <>
      {
        size.required && <label className = {s.labelCheck}>Requerido</label>
      }
      {
        !size.required && (
          <>
          <label className = {s.labelCheck}>Agregar</label>
          <input 
            className = {s.check}
            type = 'checkbox'
            onChange = {() => handleCheck(propertyName)}
            checked = {size.enabled}
          />
          </>
        )
      }
      </>

      {
        !size.required && !size.enabled &&
        <div className = {s.blockInput}>
        </div>
      }

    </div>
  )
}