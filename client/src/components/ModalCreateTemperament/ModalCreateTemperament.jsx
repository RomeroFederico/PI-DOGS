import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../Input/Input';
import { closeModalCreateTemperament, changeTemperamentsOfNewDog } from '../../redux/actions';

import { Dog } from '../../util/validaciones';

import s from './ModalCreateTemperament.module.css';

export default function ModalCreateTemperament() {

  const dispatch = useDispatch();
  const originalTemperaments = useSelector(state => state.allTemperaments);
  const { newTemperaments } = useSelector(state => state.create); 
  const [ newTemperament, setNewTemperament ] = React.useState('');
  const [ validation, setValidation ] = React.useState("-");
  const rules = Dog.getValidationRules().temperaments;

  let allTemperaments = originalTemperaments.concat(newTemperaments);

  let handleInput = function(e) {
    let { value } = e.target;
    setNewTemperament(value);
    let isValid = Dog.validateTemperament(value)
    if (isValid !== true) setValidation(isValid);
    else setValidation(Dog.checkIfTemperamentIsAvailable(allTemperaments, value) ? true : 'Temperamento no disponible');
  }

  let handleClose = function() {
    dispatch(closeModalCreateTemperament());
  }

  let handleClick = function() {
    let temperamentToAdd = { nombre: Dog.formatString(newTemperament) };
    dispatch(changeTemperamentsOfNewDog([
      ...newTemperaments,
      temperamentToAdd
    ], 'newTemperaments'));
    dispatch(closeModalCreateTemperament());
  }

  return (
    <div className = {`${s.background} center`}>
      <div className = {s.modal}>
        <div className = {s.modalTitle}>
          <span className = {s.title}>:: Crear Nuevo Temperamento ::</span>
          <button className = {s.closeModal} onClick = {handleClose}>x</button>
        </div>
        <div className = {s.divInput}>
          <Input
            value = {newTemperament}
            placeholder = "Ingrese un Temperamento Valido."
            handleInput = {handleInput}
            style = {''}
          /> 
          <div className = {`${s.validationMsg} ${ validation === true ? s.valid : ''}`}>
            {validation !== true ? validation : 'El nombre de temperamento es valido.'}
          </div>
        </div>
        <ol className = {s.rules}>
        {
          rules && rules.map((rule, index) => { return (

            <li key = {`rule-temperament-${index}`}>{rule}</li>

          )})
        }
        </ol>
        <div className = {`${s.divOptions} center`}>
          <button className = {s.btnCancel} onClick = {handleClose}>Cancelar</button>
          <button className = {s.btnCreate} onClick = {handleClick} disabled = {validation !== true}>Crear y Agregar</button>
        </div>
      </div>
    </div>
  );
}