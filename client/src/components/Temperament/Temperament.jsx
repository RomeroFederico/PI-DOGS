import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import s from './Temperament.module.css';

export default function Temperament({ name, handleClick, style = null }) {

  return (
    <button 
      className = {`${s.btnRemoveTemperament} ${name.length > 10 ? 'FONTSMALLEST' : ''} ${style}`}
      onClick = {() => handleClick(name)}
    >
      <label className = {s.remove}>x</label>
      <label className = {s.showName}>{ name }</label>
    </button>
  )
}