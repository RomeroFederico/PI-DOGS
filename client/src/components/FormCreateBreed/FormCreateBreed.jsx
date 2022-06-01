import React from 'react';
import { useDispatch } from 'react-redux';
import PropertiesTab from '../PropertiesTab/PropertiesTab';
import { initializeNewDog, validatePropertyDog } from '../../redux/actions';

import s from './FormCreateBreed.module.css';

export default function FormCreateBreed() {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(initializeNewDog());
  }, [])

  let handleClick = function(){
    dispatch(validatePropertyDog('validName'));
  }

  return (
    <div className = {`${s.globalContainer} center`}>
      <div className = {s.containerForm}>
        <PropertiesTab />
      </div>
    </div>
  );
}