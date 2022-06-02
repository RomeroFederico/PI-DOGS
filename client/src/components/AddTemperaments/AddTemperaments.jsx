import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PaginateSections from '../PaginateSections/PaginateSections';
import ConfusedDog from '../SVG/ConfusedDog/ConfusedDog';
import { startValidating, changeFormCreateSection } from '../../redux/actions';

import { Dog } from '../../util/validaciones';

import s from './AddTemperaments.module.css';

export default function AddTemperaments(){

  const dispatch = useDispatch();
  const [ changePage, setChangePage ] = React.useState(false);
  const [ exitAnimation, setExitAnimation ] = React.useState(false);
  const rules = Dog.getValidationRules().name;

  return (
    <>
      <div className = {s.imgContainer}>
        <ConfusedDog />
      </div>
      <label className = {s.title}>- Agregar Temperamentos -</label>
      <PaginateSections
        buttons = {["Volver", "Continuar"]}
        disableNext = {false}
        disableBack = {false}
      />
    </>
  );
}