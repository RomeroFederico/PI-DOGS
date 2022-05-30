import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Temperament from '../Temperament/Temperament';
import { showModalTemperaments } from '../../../redux/actions';
import { getTemperamentsFromFilters } from '../../../util';

import s from './OptionTemperaments.module.css';

export default function OptionTemperaments(props) {

  let dispatch = useDispatch();
  let { temperaments } = useSelector(state => state.home.filterData);
  let temperamentsToFilter = getTemperamentsFromFilters(temperaments);

  let handleClick = function() {
    dispatch(showModalTemperaments());
  }

  return (
    <div className = {s.containerOptions}>
      <div className = {s.optionName}>
        {`:: Temperamentos ::`}
      </div>
      <div className = {s.options}>
      {
        temperaments !== '' && temperamentsToFilter.map((t, index) => { return (

          <Temperament name = {t} key = {`temperament-${t}-${index}`} />

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