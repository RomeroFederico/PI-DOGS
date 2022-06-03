import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Temperament from '../../Temperament/Temperament';
import { showModalTemperaments, removeTemperamentFromFilters, resetBreeds, 
         getBreedsWithPaginate, getBreedsWithPaginateLocal } from '../../../redux/actions';
import { getTemperamentsFromFilters } from '../../../util';

import s from './OptionTemperaments.module.css';

export default function OptionTemperaments(props) {

  let dispatch = useDispatch();
  let { filterData, localBreeds } = useSelector(state => state.home);
  let { temperaments } = useSelector(state => state.home.filterData);
  let temperamentsToFilter = getTemperamentsFromFilters(temperaments);

  let handleClick = function() {
    dispatch(showModalTemperaments());
  }

  let handleClickTemperament = function(name) {
    let newTemperaments = filterData.temperaments.split(',').filter(t => t !== name).join(',');
    let filterDataToFetch = {
      ...filterData,
      modal: null,
      temperaments: newTemperaments
    };
    dispatch(removeTemperamentFromFilters(newTemperaments));
    dispatch(resetBreeds());
    if (localBreeds) dispatch(getBreedsWithPaginateLocal(1, filterDataToFetch));
    else dispatch(getBreedsWithPaginate(1, filterDataToFetch));
  }

  return (
    <div className = {s.containerOptions}>
      <div className = {s.optionName}>
        {`:: Temperamentos ::`}
      </div>
      <div className = {s.options}>
      {
        temperaments !== '' && temperamentsToFilter.map((t, index) => { return (

          <Temperament name = {t} key = {`temperament-${t}-${index}`} handleClick = {handleClickTemperament} />

        )})
      }
      {
        temperamentsToFilter.length < 2 && 
        <button className = {s.btnAddTemperament} onClick = {handleClick}><b className = {s.plus}>+</b> Agregar</button>
      }
      </div>
    </div>
  )
}