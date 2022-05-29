import React from 'react';
import { useSelector } from 'react-redux';
import Temperament from '../Temperament/Temperament';
import ModalTemperaments from '../ModalTemperaments/ModalTemperaments';

import s from './OptionTemperaments.module.css';

export default function OptionTemperaments(props) {

  let { temperaments } = useSelector(state => state.home.filter);
  let [ showModal, setShowModal ] = React.useState(false);

  let handleClick = function() {
    setShowModal(true);
  }

  return (
    <div className = {s.containerOptions}>
      <div className = {s.optionName}>
        {`:: Temperamentos ::`}
      </div>
      <div className = {s.options}>
      {
        showModal && <ModalTemperaments />
      }
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