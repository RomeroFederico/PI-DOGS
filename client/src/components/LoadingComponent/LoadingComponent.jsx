import React from 'react';
import DogPaw from '../SVG/DogPaw/DogPaw';

import s from './LoadingComponent.module.css';

export default function LoadingComponent() {
  return (
    <div className = {`${s.globalContainer} center`}>
      <div className = {s.containerLoading}>
        <DogPaw fill = {s.fill}/>
      </div>
    </div>
  );
}