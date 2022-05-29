import React from 'react';
import { useDispatch } from 'react-redux';
import { searchTemperamentsModal } from '../../../redux/actions';
import { validateTemperament } from '../../../util';

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

  let handlePaste = function(e) {
    e.preventDefault();
  }

  return (
    <div className = {s.containerSearch}>
      <input 
        type = 'text'
        className = {s.searchTemperament}
        placeholder = {"Busque el temperamento aqui"}
        onInput = {handleInput}
        onPaste = {handlePaste}
        value = {temperament}
      />
    </div>
  );
}