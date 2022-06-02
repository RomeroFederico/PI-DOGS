import React from 'react';
import { useDispatch } from 'react-redux';
import { searchTemperamentsModal } from '../../redux/actions';
import { validateTemperament } from '../../util';
import Input from '../Input/Input';

import s from './SearchTemperaments.module.css';

export default function SearchTemperaments() {

  let [ temperament, setTemperament ] = React.useState('');
  let dispatch = useDispatch();

  let handleInput = function(e) {
    let { value } = e.target;
    let result = validateTemperament(value);
    if (result === false) return;
    setTemperament(result);
    dispatch(searchTemperamentsModal(result));
  }

  return (
    <Input 
      value = {temperament} 
      placeholder = {"Busque el temperamento aqui"}
      handleInput = {handleInput}
    />
  );
}