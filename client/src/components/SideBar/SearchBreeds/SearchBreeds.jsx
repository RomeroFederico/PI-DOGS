import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../Input/Input';
import { validateBreed } from '../../../util';
import { resetBreeds, getBreedsByName, getBreedsWithPaginate } from '../../../redux/actions';

import s from './SearchBreeds.module.css';

export default function SearchBreeds() {
  let [ breed, setBreed ] = React.useState('');
  let { filterData, localBreeds } = useSelector(state => state.home);
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

  let handleReset = function() {
    setBreed('');
    dispatch(resetBreeds());
    dispatch(getBreedsWithPaginate(1, filterData));
  }

  return (
    <div className = {s.containerInput}>
      <Input 
        value = {breed} 
        placeholder = {"Busque una raza (min 3 car.)"}
        handleInput = {handleInput}
      />
      <button 
        className = {`${s.btnSearch} ${breed.length >= 3 ? s.enableSearch : ''}`}
        onClick = {handleClick}
      >
        Buscar
      </button>
      <button 
        className = {`${s.btnSearch} ${localBreeds ? s.enableReset : ''}`}
        onClick = {handleReset}
      >
        Reset
      </button>
    </div>
  );
}