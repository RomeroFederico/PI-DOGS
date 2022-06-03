import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PaginateSections from '../PaginateSections/PaginateSections';
import ConfusedDog from '../SVG/ConfusedDog/ConfusedDog';
import TemperamentsAdded from '../TemperamentsAdded/TemperamentsAdded';
import { showModalTemperaments } from '../../redux/actions';
import { Dog } from '../../util/validaciones';

import s from './AddTemperaments.module.css';

export default function AddTemperaments(){

  const dispatch = useDispatch();
  const { newTemperaments, oldTemperaments } = useSelector(state => state.create);

  let handleClickAdd = function() {
    dispatch(showModalTemperaments());
  }

  return (
    <>
      <div className = {s.imgContainer}>
        <ConfusedDog />
      </div>
      <label className = {s.title}>- Agregar Temperamentos (Opcional)-</label>

      <div className = {s.btnContainer}>

        <button 
          className = {`${s.btnAddNewTemperament}`}
          onClick = {handleClickAdd}
          disabled = {newTemperaments.length + oldTemperaments.length >= 9 ? true : false}
        >
          Agregar Temperamentos
        </button>

        <button 
          className = {`${s.btnAddNewTemperament}`}
          disabled = {newTemperaments.length + oldTemperaments.length >= 9 ? true : false}
        >
          Crear Nuevo Temperamento
        </button>

        <TemperamentsAdded />
      </div>

      <PaginateSections
        buttons = {["Volver", "Continuar"]}
        disableNext = {false}
        disableBack = {false}
      />
    </>
  );
}