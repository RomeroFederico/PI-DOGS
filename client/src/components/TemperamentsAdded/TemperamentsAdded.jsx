import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Temperament from '../Temperament/Temperament';
import { changeTemperamentsOfNewDog } from '../../redux/actions';

import s from './TemperamentsAdded.module.css';

export default function TemperamentsAdded() {

  const dispatch = useDispatch();
  const { newTemperaments, oldTemperaments } = useSelector(state => state.create);

  let handleClickTemperamentsOld = function(name) {
    handleClicks(name, oldTemperaments, "oldTemperaments")
  }

  let handleClickTemperamentsNew = function(name) {
    handleClicks(name, newTemperaments, "newTemperaments")
  }

  let handleClicks = function(name, temperaments, nameOfTemperaments) {
    let filtered = temperaments.filter(t => t.nombre !== name);
    dispatch(changeTemperamentsOfNewDog(filtered, nameOfTemperaments));
  }

  let generateEmptySpaces = function() {
    let disponibleSpaces = 9 - (newTemperaments.length + oldTemperaments.length);
    let spaces = [];

    for(let i = 0; i < disponibleSpaces; i++)
      spaces.push(<div className = {`${s.emptySpace} center`} key = {`emptySpace-${i}`}>- EMPTY -</div>);

    return spaces;
  }

  let emptySpaces = generateEmptySpaces();

  return (
    <div className = {s.temperamentsContainer}>
    {
      oldTemperaments && oldTemperaments.length > 0 && oldTemperaments.map((old, indexOld) => { return (

        <Temperament 
          name = {old.nombre}
          handleClick = {handleClickTemperamentsOld}
          key = {`temperament-${old.nombre}-${indexOld}`}
        />

      )})
    }
    {
      newTemperaments && newTemperaments.length > 0 && newTemperaments.map((newT, indexNewT) => { return (

        <Temperament 
          name = {newT.nombre}
          handleClick = {handleClickTemperamentsNew}
          key = {`temperament-${newT.nombre}-${indexNewT}`}
        />

      )})
    }
    {
      emptySpaces
    }
    </div>
  );
}