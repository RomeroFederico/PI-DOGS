import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBreedsWithPaginate, getTemperaments, showHome, resetHome, changeTheme} from '../../redux/actions/index.js';

import Cards from '../Cards/Cards';
import SideBar from '../SideBar/SideBar';
import ModalTemperaments from '../SideBar/ModalTemperaments/ModalTemperaments';

import s from './HomePrototipo.module.css';

export default function HomePrototipo() {
  const home = useSelector(state => state.home);
  const showModal = useSelector(state => state.home.modalAddTemperaments.show);
  const dispatch = useDispatch();

  let btnPages;

  React.useEffect(() => {
    dispatch(getBreedsWithPaginate());
    dispatch(getTemperaments());

    return () => {
      dispatch(resetHome())
    }
  }, [])

  React.useEffect(() => {
    if (!home.show && home.allTemperaments.length > 0 && home.breeds.length > 0) dispatch(showHome())
  }, [home])

  if (!home.show) return <span>Loading</span>

  let buildBtnPages = function(pages) {
    let jsx = []

    for(let i = 1; i <= pages; i++) {
      jsx.push(
        <button 
          name = {i}
          key = {`btn-page-${i}`}
          disabled = { home.currentPage === i ? true : false }
        >
        {i}
        </button>
      );
    }

    return jsx;
  }

  let handleChangeTheme = function() {
    dispatch(changeTheme());
  }

  btnPages = buildBtnPages(home.pages);

  return (
    <>
    <div className = {s.divContenedor}>
      <div className = {s.mainZone}>
        <SideBar />
        <Cards cards = {home.breeds} style = {s.cards}/>
        {
          showModal && <ModalTemperaments />
        }
      </div>
    </div>
    {btnPages}
    <h5>Page: {home.currentPage}</h5>
    <button onClick = {handleChangeTheme}>Cambiar Tema</button>
    </>
  )
};