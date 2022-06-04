import React from 'react';

import s from './NumericInput.module.css';

export default function NumericInput({ number, property, handleInput }) {

  return (
    <div className = {s.containerInput}>
      <div className = {s.containerNumber}>
        <div className = {s.up} onClick = {() => handleInput(100, property)}>
        </div>
        <div className = {`${s.num} center`}>
        { number.hundred }
        </div>
        <div className = {s.down} onClick = {() => handleInput(-100, property)}>
        </div>
      </div>
      <div className = {s.containerNumber}>
        <div className = {s.up} onClick = {() => handleInput(10, property)}>
        </div>
        <div className = {`${s.num} center`}>
        { number.ten }
        </div>
        <div className = {s.down}  onClick = {() => handleInput(-10, property)}>
        </div>
      </div>
      <div className = {s.containerNumber}>
        <div className = {s.up}  onClick = {() => handleInput(1, property)}>
        </div>
        <div className = {`${s.num} center`}>
        { number.unity }
        </div>
        <div className = {s.down}   onClick = {() => handleInput(-1, property)}>
        </div>
      </div>
    </div>
  )
}