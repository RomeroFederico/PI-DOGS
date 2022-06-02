import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../Input/Input';
import Buttons from '../Buttons/Buttons';
import DogWaiting from '../SVG/DogWaiting/DogWaiting';
import { startValidating, checkIfNameIsAvalaible, changeFormCreateSection } from '../../redux/actions';

import { Dog } from '../../util/validaciones';

import s from './AddName.module.css';

export default function AddName(){

  const { newDog, validating } = useSelector(state => state.create);
  const dispatch = useDispatch();
  const [ name, setName ] = React.useState('');
  const [ validation, setValidation ] = React.useState("-");
  const [ changePage, setChangePage ] = React.useState(false);
  const [ exitAnimation, setExitAnimation ] = React.useState(false);
  const rules = Dog.getValidationRules().name;

  React.useEffect(() => {
    if (changePage && !validating && newDog) {
      if (newDog.validName && newDog.name === name) handleNextPage();
      else handleFailure(); // Si la validacion falla, no cambia de pagina.
    }
  }, [changePage, validating]); // Se 'activa' cuando termina la validacion con el backend.

  React.useEffect(() => {
    if (newDog && newDog.validName) setName(newDog.name);
  }, []); // Carga el nombre si ya se agrego previamente.

  let handleInput = function(e) {
    let { value } = e.target;
    setName(value);
    setValidation(Dog.validateName(value));
  }

  let handleFailure = function() {
    setChangePage(false);
    setValidation('El nombre esta en uso. Inserte un nuevo nombre.');
  }

  let handleNext = function(value) {
    setChangePage(true);
    if (newDog && newDog.validName && newDog.name === name) handleNextPage(); // Habilito el cambio de pagina si ya se ha checkeado.
    dispatch(startValidating());
    dispatch(checkIfNameIsAvalaible(name));
  }

  let handleNextPage = function() {
    setExitAnimation(true);
    setTimeout(() => dispatch(changeFormCreateSection(2)), 1500);
  }

  return (
    <div className = {`center ${s.container} ${s.fadeInRight} ${exitAnimation ? `${s.applyDelay} ${s.fadeOutRight}` : ''}`}>
      <div className = {`${s.blockButtons} ${exitAnimation ? s.enabled : ''}`}>
      </div>
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
      <Buttons
        buttons = {["Volver", "Continuar"]}
        next = {handleNext}
        back = {() => {}}
        disableNext = { !newDog || validating || validation !== true }
        disableBack = {true}
      />
    </div>
  );
}