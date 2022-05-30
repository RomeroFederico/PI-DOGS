import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTemperamentFromFilters, resetBreeds, getBreedsWithPaginate } from '../../../redux/actions';

import s from './Temperament.module.css';

export default function Temperament({ name }) {

  let dispatch = useDispatch();
  let { filterData } = useSelector(state => state.home);

  let handleClick = function() {
    let newTemperaments = filterData.temperaments.split(',').filter(t => t !== name).join(',');
    let filterDataToFetch = {
      ...filterData,
      modal: null,
      temperaments: newTemperaments
    };
    dispatch(removeTemperamentFromFilters(newTemperaments));
    dispatch(resetBreeds());
    dispatch(getBreedsWithPaginate(1, filterDataToFetch));
  }

  return (
    <button 
      className = {`${s.btnRemoveTemperament} ${name.length > 10 ? 'FONTSMALLEST' : ''}`}
      onClick = {handleClick}
    >
      <label className = {s.remove}>x</label>
      <label className = {s.showName}>{ name }</label>
    </button>
  )
}