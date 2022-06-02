import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ModalTemperaments from '../../ModalTemperaments/ModalTemperaments';
import { filterTemperaments } from '../../../util';
import { closeModalTemperaments, addTemperamentToFilters, resetBreeds,
         getBreedsWithPaginate, getBreedsWithPaginateLocal } from '../../../redux/actions';

export default function ModalTemperamentsForTheHome() {

  let dispatch = useDispatch();
  let { filterData, localBreeds } = useSelector(state => state.home);
  let allTemperaments = useSelector(state => state.home.allTemperaments);
  let temperamentsFiltered = useSelector(state => state.home.filterData.temperaments);
  let { search } = useSelector(state => state.modalAddTemperaments);

  let [ temperament, setTemperament ] = React.useState('');

  let filteredTemperaments = filterTemperaments(allTemperaments, search, temperamentsFiltered);

  let handleClose = function() {
    dispatch(closeModalTemperaments());
  }

  let handleClick = function(e) {
    let { name } = e.target;
    let newTemperaments = filterData.temperaments !== '' ? `${filterData.temperaments},${name}` : name;
    let filterDataToFetch = {
      ...filterData,
      modal: null,
      temperaments: newTemperaments
    };
    dispatch(addTemperamentToFilters(newTemperaments));
    dispatch(resetBreeds());
    if (localBreeds) dispatch(getBreedsWithPaginateLocal(1, filterDataToFetch));
    else dispatch(getBreedsWithPaginate(1, filterDataToFetch));
  }

  return (
    <ModalTemperaments
      handleClose = {handleClose}
      handleClick = {handleClick}
      temperaments = {filteredTemperaments}
    />
  );
}