import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PaginateSections from '../PaginateSections/PaginateSections';
import InputsSize from '../InputsSize/InputsSize';
import ValidatorBMI from '../ValidatorBMI/ValidatorBMI';
import DogSize from '../SVG/DogSize/DogSize';
import { changeSizeOfNewDog, changeFormCreateSection, setBackPageAnimation, setNextPageAnimation } from '../../redux/actions';

import { getDelayForPaginateAnimation } from '../../util';
import { Dog } from '../../util/validaciones';

import s from './AddSize.module.css';

export default function AddSize(){

  const dispatch = useDispatch();
  const { newDog } = useSelector(state => state.create);
  const [ size, setSize ] = React.useState(Dog.getDefaultSize());
  const [ imc, setImc ] = React.useState(Dog.getIMCValues(1, 10));
  const [ valid, setValid ] = React.useState({
    isValid: true,
    msg: 'IMC Valido'
  });

  const rules = Dog.getValidationRules().size;
  const minMaxValues = Dog.getminMaxValues();

  React.useEffect(() => {
    if (newDog && newDog.validWeighAndHeight) {
      let sizeFormated = Dog.reformatSize(newDog);
      console.log(sizeFormated);
      setSize({ ...sizeFormated });
      setImc({ ...Dog.getIMCValues(sizeFormated.maxWeight.number, sizeFormated.maxHeight.number) });
      setValid({ isValid: true, msg: 'IMC Valido'});
    }
  }, []);

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

    setSize({ ...newSize });
    validateIMC(newSize);
    validateMinSize(newSize);
  }

  let handleCheck = function(property) {

    let newSize = { 
      ...size, 
      [property]: {
        ...size[property],
        enabled: !size[property].enabled
      }
    };

    setSize({ ...newSize });
    validateIMC(newSize);
    validateMinSize(newSize);
  }

  let validateIMC = function(size) {
    let newImc = Dog.getIMCValues(size.maxWeight.number, size.maxHeight.number);
    if (newImc.isValid) setValid({
      isValid: true,
      msg: 'IMC Valido'
    });
    else setValid({
      isValid: false,
      msg: 'IMC Invalido'
    });
    setImc({ ...newImc });
  }

  let validateMinSize = function(size) {
    if (!Dog.checkIfMinSizeIsValid(size)) setValid({
      isValid: false,
      msg: 'Error Valor Min'
    });
  }

  let handleNext = function(value) {
    let { height, weight } = Dog.formatSize(size);
    dispatch(changeSizeOfNewDog(height, weight));
    dispatch(setNextPageAnimation());
    dispatch(changeFormCreateSection(4, getDelayForPaginateAnimation()));
  }

  let handleBack = function(value) {
    if (newDog && valid && newDog.validWeighAndHeight && valid.isValid) {
      let { height, weight } = Dog.formatSize(size);
      dispatch(changeSizeOfNewDog(height, weight));
    }
    dispatch(setBackPageAnimation());
    dispatch(changeFormCreateSection(2, getDelayForPaginateAnimation()));
  }

  return (
    <>
      <div className = {s.imgContainer}>
        <DogSize />
      </div>

      <label className = {s.title}>- Agregar Medidas -</label>

      <InputsSize 
        size = {size}
        imc = {imc} 
        validMsg = {valid} 
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
        disableNext = {!imc || !valid || !valid.isValid}
        disableBack = {false}
        cbHandleNext = {handleNext}
        cbHandleBack = {handleBack}
      />
    </>
  );
}