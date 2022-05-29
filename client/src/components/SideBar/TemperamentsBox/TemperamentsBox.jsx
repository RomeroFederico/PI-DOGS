import React from 'react';
import { useDispatch } from 'react-redux';
import { addTemperamentToFilters } from '../../../redux/actions';

import s from './TemperamentsBox.module.css';

export default function TemperamentsBox({ temperaments }) {

  let dispatch = useDispatch();

  let handleClick = function(e) {
    let { name } = e.target;
    dispatch(addTemperamentToFilters(name));
  }

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