import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../Input/Input';
import Buttons from '../Buttons/Buttons';
import DogWaiting from '../SVG/DogWaiting/DogWaiting';
import { startValidating, checkIfNameIsAvalaible } from '../../redux/actions';

import { Dog } from '../../util/validaciones';

import s from './AddName.module.css';

export default function AddName(){

  const { newDog, validating } = useSelector(state => state.create);
  const dispatch = useDispatch();
  const [ name, setName ] = React.useState('');
  const [ validation, setValidation ] = React.useState("-");
  const rules = Dog.getValidationRules().name;

  React.useEffect(() => {
    if (newDog && name && validation === true) checkAvailability(name);
  }, [validation, name])

  let handleInput = function(e) {
    let { value } = e.target;
    setName(value);
    setValidation(Dog.validateName(value));
  }

  let checkAvailability = function(value) {
    dispatch(startValidating());
    dispatch(checkIfNameIsAvalaible(name));
  }

  return (
    <div className = {`center ${s.container} ${s.fadeInRight}`}>
      <div className = {s.imgContainer}>
        <DogWaiting />
      </div>
      <label className = {s.title}>- Agregar Nombre -</label>
      <div className = {s.containerInput}>
        <Input
          value = {name}
          placeholder = {'Ingrese un Nombre Valido'}
          handleInput = {handleInput}
        />
        <div className = {s.validationMsg}>
          {validation}
        </div>
      </div>
      <ol className = {s.rules}>
      {
        rules && rules.map((rule, index) => { return (

          <li key = {`rule-name-${index}`}>{rule}</li>

        )})
      }
      </ol>
      <Buttons
        buttons = {["Volver", "Continuar"]}
        next = {() => {}}
        back = {() => {}}
        disableNext = { !newDog || validation !== true || validating ? true : !newDog.validName }
        disableBack = {true}
      />
    </div>
  );
}