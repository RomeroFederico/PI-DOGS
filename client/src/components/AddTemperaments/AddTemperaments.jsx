import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PaginateSections from '../PaginateSections/PaginateSections';
import ConfusedDog from '../SVG/ConfusedDog/ConfusedDog';
import TemperamentsAdded from '../TemperamentsAdded/TemperamentsAdded';
import { showModalTemperaments, showModalCreateTemperament, validatePropertyDog, 
         setNextPageAnimation, changeFormCreateSection } from '../../redux/actions';

import { getDelayForPaginateAnimation } from '../../util';

import s from './AddTemperaments.module.css';

export default function AddTemperaments(){

  const dispatch = useDispatch();
  const { newTemperaments, oldTemperaments, newDog } = useSelector(state => state.create);

  let handleClickAdd = function() {
    dispatch(showModalTemperaments());
  }

  let handleClickCreate = function() {
    dispatch(showModalCreateTemperament());
  }

  let handleNext = function() {
    if (newDog && !newDog.validTemperaments) dispatch(validatePropertyDog('validTemperaments'));
    dispatch(setNextPageAnimation());
    dispatch(changeFormCreateSection(3, getDelayForPaginateAnimation()));
  }

  return (
    <>
      <div className = {s.imgContainer}>
        <ConfusedDog />
      </div>
      <label className = {s.title}>- Agregar Temperamentos (Opcional)-</label>

      <div className = {s.btnContainer}>

        <button
          onClick = {handleClickAdd}
          className = {`${s.btnAddNewTemperament}`}
          disabled = {newTemperaments.length + oldTemperaments.length >= 9 ? true : false}
        >
          Agregar
        </button>

        <button
          onClick = {handleClickCreate}
          className = {`${s.btnAddNewTemperament}`}
          disabled = {newTemperaments.length + oldTemperaments.length >= 9 ? true : false}
        >
          Crear Nuevo
        </button>

        <TemperamentsAdded />
      </div>

      <PaginateSections
        buttons = {["Volver", "Continuar"]}
        disableNext = {false}
        disableBack = {false}
        cbHandleNext = {handleNext}
      />
    </>
  );
}