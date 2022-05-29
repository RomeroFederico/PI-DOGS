import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Temperament from '../Temperament/Temperament';
import { showModalTemperaments } from '../../../redux/actions';

import s from './OptionTemperaments.module.css';

export default function OptionTemperaments(props) {

  let dispatch = useDispatch();
  let { temperaments } = useSelector(state => state.home.filter);

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
        temperaments && temperaments[0] !== '' && temperaments.map((t, index) => { return (

          <Temperament name = {t} key = {`temperament-${t}-${index}`} />

        )})
      }
      {
        temperaments && temperaments.length < 5 && 
        <button className = {s.btnAddTemperament} onClick = {handleClick}><b className = {s.plus}>+</b> Agregar</button>
      }
      </div>
    </div>
  )
}