import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTemperamentToFilters, resetBreeds, getBreedsWithPaginate } from '../../../redux/actions';

import s from './TemperamentsBox.module.css';

export default function TemperamentsBox({ temperaments }) {

  let dispatch = useDispatch();
  let { filterData } = useSelector(state => state.home);

  let handleClick = function(e) {
    let { name } = e.target;
    let newTemperaments = filterData.temperaments !== '' ? `${filterData.temperaments},${name}` : name;
    let filterDataToFetch = {
      ...filterData,
      modal: null,
      temperaments: newTemperaments
    };
    dispatch(addTemperamentToFilters(newTemperaments));
    dispatch(resetBreeds());
    dispatch(getBreedsWithPaginate(1, filterDataToFetch));
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