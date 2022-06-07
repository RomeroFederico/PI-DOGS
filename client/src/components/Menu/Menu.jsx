import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeTheme } from '../../redux/actions';
import Sun from '../SVG/Sun/Sun';
import Moon from '../SVG/Moon/Moon';
import Home from '../SVG/Home/Home';
import Create from '../SVG/Create/Create';

import s from './Menu.module.css';

export default function Menu() {

  const dispatch = useDispatch();
  const location = useLocation();
  const { theme } = useSelector(state => state);

  let handleChangeTheme = function() {
    dispatch(changeTheme());
  }

  return (
    <div className = {s.menuContainer}>
      {
        location && location.pathname !== '/alta' &&
        <Link to = '/alta'>
          <div className = {`${s.btnWithTag} center`}>
              <div className = {s.showIconWithTag}>
                <Create />
              </div>
              <span className = {s.tag} >Nuevo</span>
          </div>
        </Link>
      }
      {
        location && location.pathname !== '/home' &&
        <Link to = '/home'>
          <div className = {`${s.btnWithTag} center`}>
              <div className = {s.showIconWithTag}>
                <Home />
              </div>
              <span className = {s.tag} >Inicio</span>
          </div>
        </Link>
      }
      <div className = {s.btn} onClick = {handleChangeTheme}>
      {
        theme === 'ligthTheme' && 
        <div className = {s.showIcon}>
          <Sun />
        </div>
      }
      {
        theme === 'darkTheme' && 
        <div className = {s.showIcon}>
          <Moon />
        </div>
      }
      </div>
    </div>
  )
}