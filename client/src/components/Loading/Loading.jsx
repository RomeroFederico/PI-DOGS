import React from 'react';
import { useSelector } from 'react-redux';
import DogPaw from '../SVG/DogPaw/DogPaw';

import s from './Loading.module.css';

export default function Loading({style}){

  const { validating } = useSelector(state => state.create);

  return (
    <div className = {`${s.loadingContainer} ${style ? style : ''} ${validating ? s.enabled : ''}`}>
      <DogPaw style = {s.loadingFill}/>
    </div>
  )
}