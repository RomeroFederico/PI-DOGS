import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PaginateSections from '../PaginateSections/PaginateSections';
import InputSize from '../InputSize/InputSize';
import DogSize from '../SVG/DogSize/DogSize';
// import { startValidating } from '../../redux/actions';

import { Dog } from '../../util/validaciones';

import s from './AddSize.module.css';

export default function AddSize(){

  const dispatch = useDispatch();
  const { newDog } = useSelector(state => state.create);
  const [ size, setSize ] = React.useState(Dog.getDefaultSize());
  const [ imc, setImc ] = React.useState(Dog.getIMCValues(1, 10));

  const rules = Dog.getValidationRules().size;
  const minMaxValues = Dog.getminMaxValues();

  let handleInput = function(value, property) {
    let newSize = { ...size };
    let result = newSize[property].number + value;
    if (result >= minMaxValues[property].max) result = minMaxValues[property].max;
    if (result <= minMaxValues[property].min) result = minMaxValues[property].min;

    let sizeNumberString = ("00" + result).split("");
    newSize[property].unity = sizeNumberString.pop();
    newSize[property].ten = sizeNumberString.pop();
    newSize[property].hundred = sizeNumberString.pop();
    newSize[property].number = result;

    console.log(newSize);
    setSize({ ...newSize });
    setImc(Dog.getIMCValues(newSize.maxWeight.number, newSize.maxHeight.number));
  }

  let handleCheck = function(property) {
    setSize({
      ...size,
      [property]: {
        ...size[property],
        enabled: !size[property].enabled
      }
    })
  }

  return (
    <>
      <div className = {s.imgContainer}>
        <DogSize />
      </div>
      <label className = {s.title}>- Agregar Medidas -</label>
      <div className = {s.inputZone}>
      {
        size && imc && Object.keys(size).map((property, index)=> { return (

            <>
            {
              index === 2 && imc && (
                <div className = {s.containerIsValid}>
                  <label className = {s.imcTitle}>{imc.imc}</label>
                  <hr />
                  <label className = {s.imcSubTitle}>{imc.min} : {imc.max}</label>
                </div>
              )
            }
            <InputSize 
              key = {`InputSize-${property}-${index}`}
              size = {size[property]}
              propertyName = {property}
              handleInput = {handleInput}
              handleCheck = {handleCheck}
            />
            </>
          )
        })
      }
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
        disableNext = {!imc || !imc.isValid}
        disableBack = {true}
      />
    </>
  );
}