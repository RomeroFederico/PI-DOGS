import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputLifeSpan from '../InputLifeSpan/InputLifeSpan';
import PaginateSections from '../PaginateSections/PaginateSections';
import DogHealth from '../SVG/DogHealth/DogHealth';
import { changeLifespanOfNewDog, setNextPageAnimation, setBackPageAnimation, changeFormCreateSection } from '../../redux/actions';

import { Dog } from '../../util/validaciones';
import { getDelayForPaginateAnimation } from '../../util';

import s from './AddLifeSpan.module.css';

export default function AddLifeSpan() {

  const dispatch = useDispatch();
  const { newDog } = useSelector(state => state.create);

  const [ valid, setValid ] = React.useState(true);
  const [ lifespan, setLifespan ] = React.useState(Dog.getDefaultLifespan());

  const minMaxValues = { min: 5, max: 20 };
  const rules = Dog.getValidationRules().lifespan;

  React.useEffect(() => {
    if (newDog && newDog.validLifespan) setLifespan(Dog.reformatLifespan(newDog.lifespan));
  }, []);

  let handleInput = function(value, property) {
    let newLifespan = { ...lifespan };
    let result = newLifespan[property].number + value;
    if (result >= minMaxValues.max) result = minMaxValues.max;
    if (result <= minMaxValues.min) result = minMaxValues.min;

    let lifespanNumberString = ("0" + result).split("");
    newLifespan[property].unity = lifespanNumberString.pop();
    newLifespan[property].ten = lifespanNumberString.pop();
    newLifespan[property].number = result;

    setLifespan({ ...newLifespan });
    setValid(handleValidation(newLifespan));
  }

  let handleCheck = function(property) {
    let newLifespan = {
      ...lifespan,
      [property]: {
        ...lifespan[property],
        enabled: !lifespan[property].enabled,
      }
    };
    setLifespan({ ...newLifespan });
    setValid(handleValidation(newLifespan));
  }

  let handleValidation = function(lifespan) {
    if (lifespan.min.enabled && lifespan.max.enabled) return lifespan.min.number < lifespan.max.number;
    return true;
  }

  let handleNext = function() {
    dispatch(changeLifespanOfNewDog({
      min: lifespan.min.enabled ? lifespan.min.number : null,
      max: lifespan.max.enabled ? lifespan.max.number : null
    }));
    dispatch(setNextPageAnimation());
    dispatch(changeFormCreateSection(5, getDelayForPaginateAnimation()));
  }

  let handleBack = function() {
    if (newDog && newDog.lifespan) dispatch(changeLifespanOfNewDog({
      min: lifespan.min.enabled ? lifespan.min.number : null,
      max: lifespan.max.enabled ? lifespan.max.number : null
    }));
    dispatch(setBackPageAnimation());
    dispatch(changeFormCreateSection(3, getDelayForPaginateAnimation()));
  }

  return (
    <>
      <div className = {s.imgContainer}>
        <DogHealth />
      </div>

      <label className = {s.title}>- Agregar Años de Vida (Opcional)-</label>

      <div className = {s.containerInputLifespan}>
        {
          lifespan && Object.keys(lifespan).map((lifeProperty, index) => 

            <InputLifeSpan 
              lifespan = {lifespan[lifeProperty]}
              property = {lifeProperty}
              handleInput = {handleInput}
              handleCheck = {handleCheck}
              key = {`InputLifeSpan-${lifespan[lifeProperty].clientName}-${index}`}
            />
          )
        }
        <div className = {`${s.isValidContainer} ${ valid ? s.isValid : '' }`}>
          { valid ? '✔' : 'X' }
        </div>
      </div>

      <div className = {s.rules}>
      {
        rules && rules.map((rule, index) => { return (

          <li key = {`rule-name-${index}`}>{rule}</li>

        )})
      }
      </div>

      <PaginateSections
        buttons = {["Volver", "Continuar"]}
        disableNext = {!valid}
        disableBack = {false}
        cbHandleNext = {handleNext}
        cbHandleBack = {handleBack}
      />
    </>
  )
}