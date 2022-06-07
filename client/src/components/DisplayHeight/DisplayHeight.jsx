import React from 'react';
import Dog from '../SVG/Dog/Dog';
import Man from '../SVG/Man/Man';

import s from './DisplayHeight.module.css';

export default function DisplayHeight({ height, varSize, size }) {

  const proportionalHeight = (height * 5 / 160 + 0.3).toFixed(1) + 'rem'; 

  return (
    <div className = {`${s.containerMeasure} ${varSize ? varSize : ''}`}>

      <div className = {s.dog} style = {{height: `${proportionalHeight}`, width: `${proportionalHeight}`}}>
        <Dog />
      </div>

      <div className = {s.man}>
        <Man />
      </div>

      <label className = {s.dogHeight}>{`${height} cm`}</label>

      <label className = {s.manHeight}>{'160 cm'}</label>

      <div className = {s.size}>{size}</div>

    </div>
  );
}