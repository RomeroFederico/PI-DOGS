import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TemperamentsBox from '../TemperamentsBox/TemperamentsBox';
import SearchTemperaments from '../SearchTemperaments/SearchTemperaments'
import { filterTemperaments } from '../../../util';
import { closeModalTemperaments } from '../../../redux/actions';

import s from './ModalTemperaments.module.css';

export default function ModalTemperaments() {

  let dispatch = useDispatch();
  let allTemperaments = useSelector(state => state.home.allTemperaments);
  let temperamentsFiltered = useSelector(state => state.home.filterData.temperaments);
  let { search } = useSelector(state => state.home.modalAddTemperaments);

  let filteredTemperaments = filterTemperaments(allTemperaments, search, temperamentsFiltered);

  let handleClick = function() {
    dispatch(closeModalTemperaments());
  }

  return (
    <div className = {`${s.background} center`}>
      <div className = {s.modal}>
        <div className = {s.modalTitle}>
          <span className = {s.title}>:: Agregar Temperamento ::</span>
          <button className = {s.closeModal} onClick = {handleClick}>x</button>
        </div>
        <SearchTemperaments />
        <TemperamentsBox temperaments = {filteredTemperaments}/>
      </div>
    </div>
  );
}