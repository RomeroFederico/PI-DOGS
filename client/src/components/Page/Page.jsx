import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPage, resetBreeds, getBreedsWithPaginate, getBreedsWithPaginateLocal } from '../../redux/actions/index.js';

import s from './Page.module.css';

export default function Page({ page, symbol, disabled}) {

  let dispatch = useDispatch();
  let { currentPage, filterData, localBreeds } = useSelector(state => state.home);

  let handleClick = function() {
    dispatch(setPage(page));
    dispatch(resetBreeds());
    if (localBreeds) dispatch(getBreedsWithPaginateLocal(page, { ...filterData }));
    else dispatch(getBreedsWithPaginate(page, { ...filterData }));
  }

  return (
    <button
      className = {`${s.btnPage} ${page && currentPage !== page ? s.enabled : ''} ${page === currentPage ? s.current : ''}`}
      onClick = {page && currentPage !== page ? handleClick : null}
    >
      {symbol ? symbol : page}
    </button>
  )
}