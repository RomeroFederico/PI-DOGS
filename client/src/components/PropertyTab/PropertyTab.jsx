import React from 'react';
import { useSelector } from 'react-redux';

import s from './PropertyTab.module.css';

export default function PropertyTab({ name, isPropertyValid, imageComponent }) {

  const { newDog } = useSelector(state => state.create);

  return (
    <div className = {s.containerTab}>
      {imageComponent}
      <span className = {s.tabTitle}>{name}</span>
      <span className = {s.tabIsValid}>
      { isPropertyValid ? (newDog[isPropertyValid] ? '✔' : 'X' ) : '⚪' }
      </span>
    </div>
  );
}