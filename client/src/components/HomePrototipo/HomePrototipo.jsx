import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBreedsWithPaginate, getTemperaments, showHome, resetHome, changeTheme} from '../../redux/actions/index.js';

import Cards from '../Cards/Cards';
import SideBar from '../SideBar/SideBar';
import ModalTemperamentsForTheHome from '../SideBar/ModalTemperamentsForTheHome/ModalTemperamentsForTheHome';
import Pages from '../Pages/Pages';

import s from './HomePrototipo.module.css';

export default function HomePrototipo() {
  const allTemperaments = useSelector(state => state.allTemperaments);
  const home = useSelector(state => state.home);
  const showModal = useSelector(state => state.modalAddTemperaments.show);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getBreedsWithPaginate());
    dispatch(getTemperaments());

    return () => {
      dispatch(resetHome())
    }
  }, [])

  React.useEffect(() => {
    if (!home.show && allTemperaments.length > 0 && home.breeds.length > 0) dispatch(showHome())
  }, [home])

  if (!home.show) return <span>Loading</span>

  let handleChangeTheme = function() {
    dispatch(changeTheme());
  }

  return (
    <>
    <div className = {s.divContenedor}>
      <div className = {s.mainZone}>
        <SideBar />
        <Pages />
        <Cards cards = {home.breeds} style = {s.cards}/>
        {
          showModal && <ModalTemperamentsForTheHome />
        }
        <Pages />
      </div>
    </div>
    <button onClick = {handleChangeTheme}>Cambiar Tema</button>
    </>
  )
};