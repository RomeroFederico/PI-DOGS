import React from 'react';

import s from './Temperament.module.css';

export default function Temperament({ name }) {

  let [ showRemove, setShowRemove ] = React.useState(false);

  let handleHover = function() {
    setShowRemove(!showRemove);
  }

  return (
    <button 
      className = {`${s.btnRemoveTemperament} ${name.length > 10 ? 'FONTSMALLEST' : ''}`}
      onMouseEnter = {handleHover}
      onMouseLeave = {handleHover}>
      { showRemove ? 'Quitar' : name }
    </button>
  )
}