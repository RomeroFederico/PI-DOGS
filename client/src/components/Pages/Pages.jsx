import React from 'react';
import { useSelector } from 'react-redux';
import Page from '../Page/Page';
import { getPages } from '../../util';

import s from './Pages.module.css';

export default function Pages() {

  let { pages, currentPage } = useSelector(state => state.home);

  let index = getPages(currentPage, pages);

  return (
    <div className = {'center'}>
      <div className = {s.containerIndex}>
      { 
        index && index.map((i, ind) => { return (

          <Page
            key = {`page-${i.index}-${ind}`}
            page = {i.index}
            symbol = {i.symbol}
          />

        )})
      }
      </div>
    </div>
  )
}