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
  const [ size, setSize ] = React.useState({
    minWeight: {
      hundred: "0",
      ten: "0",
      unity: "1",
      number: 1,
      nombre: 'Peso Min.',
      unidad: 'Kg',
      enabled: false,
    },
    maxWeight: {
      hundred: "0",
      ten: "0",
      unity: "1",
      number: 1,
      nombre: 'Peso Max.',
      unidad: 'Kg',
      required: true
    },
    minHeight: {
      hundred: "0",
      ten: "1",
      unity: "0",
      number: 10,
      nombre: 'Altura Min.',
      unidad: 'cm',
      enabled: false,
    },
    maxHeight: {
      hundred: "0",
      ten: "1",
      unity: "0",
      number: 10,
      nombre: 'Altura Max.',
      unidad: 'cm',
      required: true
    }  
  });

  const rules = Dog.getValidationRules().size;
  const minMaxValues = Dog.getminMaxValues();

  let handleInput = function(value, property) {
    let result = size[property].number + value;
    if (result > minMaxValues[property].max) result = minMaxValues[property].max;
    if (result < minMaxValues[property].min) result = minMaxValues[property].min;
    let sizeNumberString = ("00" + result).split("");
    setSize({
      ...size,
      [property]: {
        ...size[property],
        unity: sizeNumberString.pop(),
        ten: sizeNumberString.pop(),
        hundred: sizeNumberString.pop(),
        number: result
      }
    });
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
        size && Object.keys(size).map((property, index)=> { return (

            <>
            {
              index === 2 &&  <div className = {s.containerIsValid}></div>
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
        disableNext = {false}
        disableBack = {true}
      />
    </>
  );
}