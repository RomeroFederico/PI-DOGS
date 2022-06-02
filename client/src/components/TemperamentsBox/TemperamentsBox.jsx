import React from 'react';

import s from './TemperamentsBox.module.css';

export default function TemperamentsBox({ temperaments, handleClick}) {

  return (
    <div className = {s.temperaments}>
    {
      temperaments && temperaments.map((t, index) => 
        <button 
          key = {`temperament-search-${t.nombre}-${index}`}
          className = {s.temperamento}
          onClick = {handleClick}
          name = {t.nombre}
        >
          {t.nombre}
        </button>
      )
    }
    </div>
  );
}