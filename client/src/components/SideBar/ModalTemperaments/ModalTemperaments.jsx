import React from 'react';
import { useSelector } from 'react-redux';

import s from './ModalTemperaments.module.css';

export default function ModalTemperaments() {

  let { temperaments } = useSelector(state => state.home);

  return (
    <div className = {`${s.background} center`}>
      <div className = {`${s.modal} center`}>
        <div className = {s.temperaments}>
        {
          temperaments && temperaments.map(t => <label className = {s.temperamento}>{t.nombre}</label>)
        }
        </div>
      </div>
    </div>
  );
}