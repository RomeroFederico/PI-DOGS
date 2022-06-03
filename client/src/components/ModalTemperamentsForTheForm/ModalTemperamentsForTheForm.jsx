import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ModalTemperaments from '../ModalTemperaments/ModalTemperaments';
import { filterTemperamentsForm } from '../../util';
import { closeModalTemperaments, changeTemperamentsOfNewDog } from '../../redux/actions';

export default function ModalTemperamentsForTheForm() {

  let dispatch = useDispatch();
  let allTemperaments = useSelector(state => state.allTemperaments);
  const { oldTemperaments } = useSelector(state => state.create);
  let { search } = useSelector(state => state.modalAddTemperaments);

  let [ temperament, setTemperament ] = React.useState('');

  let filteredTemperaments = filterTemperamentsForm(allTemperaments, search, oldTemperaments);

  let handleClose = function() {
    dispatch(closeModalTemperaments());
  }

  let handleClick = function(e) {
    let { name } = e.target;
    let temperamentToAdd = allTemperaments.find(t => t.nombre === name);
    dispatch(changeTemperamentsOfNewDog([
      ...oldTemperaments,
      temperamentToAdd
    ], 'oldTemperaments'));
  }

  return (
    <ModalTemperaments
      handleClose = {handleClose}
      handleClick = {handleClick}
      temperaments = {filteredTemperaments}
    />
  );
}