import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Buttons from '../Buttons/Buttons';
import { startValidating, changeFormCreateSection } from '../../redux/actions';

import { Dog } from '../../util/validaciones';

import s from './AddTemperaments.module.css';

export default function AddTemperaments(){

  return (
    <div className = {s.fadeIn}>Hola</div>
  );
}