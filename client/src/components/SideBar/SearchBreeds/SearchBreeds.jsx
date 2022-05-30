import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../Input/Input';
import { validateBreed } from '../../../util';
import { resetBreeds, getBreedsByName } from '../../../redux/actions';

import s from './SearchBreeds.module.css';

export default function SearchBreeds() {
  let [ breed, setBreed ] = React.useState('');
  let { filterData } = useSelector(state => state.home);
  let dispatch = useDispatch();

  let handleInput = function(e) {
    let { value } = e.target;
    let result = validateBreed(value);
    if (result === false) return;
    setBreed(result);
  }

  let handleClick = function() {
    dispatch(resetBreeds());
    dispatch(getBreedsByName(breed, filterData));
  }

  return (
    <div className = {s.containerInput}>
      <Input 
        value = {breed} 
        placeholder = {"Busque una raza (min 3 caracteres)"}
        handleInput = {handleInput}
      />
      <button 
        className = {`${s.search} ${breed.length >= 3 ? s.enabled : ''}`}
        onClick = {handleClick}
      >
        Buscar
      </button>
    </div>
  );
}