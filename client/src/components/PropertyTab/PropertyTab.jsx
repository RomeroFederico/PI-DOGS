import React from 'react';
import { useSelector } from 'react-redux';

import s from './PropertyTab.module.css';

export default function PropertyTab({ name, isPropertyValid, imageComponent, correspondingSection }) {

  const { newDog, section } = useSelector(state => state.create);

  return (
    <div className = {`${s.containerTab} ${section && correspondingSection === section ? s.isOn : '' }`}>
      {imageComponent}
      <span className = {s.tabTitle}>{name}</span>
      <span className = {`${s.tabIsValid} ${ newDog && newDog[isPropertyValid] ? s.valid : s.invalid }`}>
      { 
        isPropertyValid ? 
        (newDog[isPropertyValid] ? <i>✔</i> : <i>X</i> )
        : '⚪'
      }
      </span>
    </div>
  );
}