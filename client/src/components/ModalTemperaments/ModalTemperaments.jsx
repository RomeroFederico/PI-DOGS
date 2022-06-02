import React from 'react';
import TemperamentsBox from '../TemperamentsBox/TemperamentsBox';
import SearchTemperaments from '../SearchTemperaments/SearchTemperaments';

import s from './ModalTemperaments.module.css';

export default function ModalTemperaments({ handleClose, handleClick, temperaments }) {
  return (
    <div className = {`${s.background} center`}>
      <div className = {s.modal}>
        <div className = {s.modalTitle}>
          <span className = {s.title}>:: Agregar Temperamento ::</span>
          <button className = {s.closeModal} onClick = {handleClose}>x</button>
        </div>
        <SearchTemperaments />
        <TemperamentsBox 
          temperaments = {temperaments}
          handleClick = {handleClick}
        />
      </div>
    </div>
  );
}