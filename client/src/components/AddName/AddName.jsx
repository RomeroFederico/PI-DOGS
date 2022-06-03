import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../Input/Input';
import PaginateSections from '../PaginateSections/PaginateSections';
import DogWaiting from '../SVG/DogWaiting/DogWaiting';
import { startValidating, checkIfNameIsAvalaible, changeFormCreateSection, setNextPageAnimation } from '../../redux/actions';

import { Dog } from '../../util/validaciones';
import { getDelayForPaginateAnimation } from '../../util/';

import s from './AddName.module.css';

export default function AddName(){

  const { newDog, validating } = useSelector(state => state.create);
  const dispatch = useDispatch();

  const [ name, setName ] = React.useState('');
  const [ validation, setValidation ] = React.useState("-");
  const rules = Dog.getValidationRules().name;

  React.useEffect(() => {
    if (!validating && newDog && name !== '') {
      if (newDog.validName && newDog.name === name) handleNextPageWithDelay();
      else handleFailure(); // Si la validacion falla, no cambia de pagina.
    }
  }, [validating]); // Se 'activa' cuando termina la validacion con el backend.

  React.useEffect(() => {
    if (newDog && newDog.validName) {
      setName(newDog.name);
      setValidation(true);
    }
  }, []); // Carga el nombre si ya se agrego previamente.

  let handleInput = function(e) {
    let { value } = e.target;
    setName(value);
    setValidation(Dog.validateName(value));
  }

  let handleFailure = function() {
    setValidation('El nombre esta en uso. Inserte un nuevo nombre.');
  }

  let handleNext = function(value) {
    if (newDog && newDog.validName && newDog.name === name) {
      dispatch(setNextPageAnimation());
      dispatch(changeFormCreateSection(2, getDelayForPaginateAnimation())); // Habilito el cambio de pagina si ya se ha checkeado.
      return;
    }
    dispatch(startValidating());
    dispatch(checkIfNameIsAvalaible(name));
  }

  let handleNextPageWithDelay = function() {
    setTimeout(() => {
      dispatch(setNextPageAnimation());
      dispatch(changeFormCreateSection(2, getDelayForPaginateAnimation()));
    }, 1500);
  }

  return (
    <>
      <div className = {s.imgContainer}>
        <DogWaiting />
      </div>
      <label className = {s.title}>- Agregar Nombre -</label>
      <div className = {s.containerInput}>
        <Input
          value = {name}
          placeholder = {'Ingrese un Nombre Valido'}
          handleInput = {handleInput}
          disable = { validating ? true : false }
        />
        {
          validating && <div className = {s.checkingBackendMsg}>Comprobando que el nombre este disponible...</div>
        }
        {
          !validating && (!newDog || !newDog.validName || newDog.name !== name) && 
          <div className = {s.validationMsg}>{validation}</div>
        }
        {
          !validating && newDog && newDog.validName && newDog.name === name &&
          <div className = {s.valid}>El nombre se ha validado correctamente.</div>
        }
      </div>
      <ol className = {s.rules}>
      {
        rules && rules.map((rule, index) => { return (

          <li key = {`rule-name-${index}`}>{rule}</li>

        )})
      }
      </ol>
      <PaginateSections
        buttons = {["Volver", "Continuar"]}
        disableNext = { !newDog || validating || validation !== true }
        disableBack = {true}
        cbHandleNext = {handleNext}
      />
    </>
  );
}