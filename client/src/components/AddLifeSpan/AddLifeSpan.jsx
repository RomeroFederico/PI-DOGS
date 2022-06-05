import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputLifeSpan from '../InputLifeSpan/InputLifeSpan';
import PaginateSections from '../PaginateSections/PaginateSections';
import DogHealth from '../SVG/DogHealth/DogHealth';

import { Dog } from '../../util/validaciones';

import s from './AddLifeSpan.module.css';

export default function AddLifeSpan() {

  const [ lifespan, setLifespan ] = React.useState({
    ten: "0",
    unity: "5",
    number: 5,
    enabled: false,
  })

  const minMaxValues = { min: 5, max: 20 };
  const rules = Dog.getValidationRules().lifespan;

  let handleInput = function(value) {
    let newLifespan = { ...lifespan };
    let result = newLifespan.number + value;
    if (result >= minMaxValues.max) result = minMaxValues.max;
    if (result <= minMaxValues.min) result = minMaxValues.min;

    let lifespanNumberString = ("0" + result).split("");
    newLifespan.unity = lifespanNumberString.pop();
    newLifespan.ten = lifespanNumberString.pop();
    newLifespan.number = result;

    setLifespan({ ...newLifespan });
  }

  let handleCheck = function() {
    setLifespan({
      ...lifespan,
      enabled: !lifespan.enabled,
    })
  }

  return (
    <>
      <div className = {s.imgContainer}>
        <DogHealth />
      </div>

      <label className = {s.title}>- Agregar Años de Vida (Opcional)-</label>

      <InputLifeSpan 
        lifespan = {lifespan}
        handleInput = {handleInput}
        handleCheck = {handleCheck}
      />

      <div className = {s.rules}>
      {
        rules && rules.map((rule, index) => { return (

          <li key = {`rule-name-${index}`}>{rule}</li>

        )})
      }
      </div>

      <PaginateSections
        buttons = {["Volver", "Continuar"]}
        disableNext = {false}
        disableBack = {false}
      />
    </>
  )
}