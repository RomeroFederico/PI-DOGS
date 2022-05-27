import React from 'react';
import Option from '../Option/Option';

import s from './Options.module.css';

export default function Options({ optionName, posibleValues }) {

  return (
    <div className = {s.containerOptions}>
      <div className = {s.optionName}>
        {optionName}
      </div>
      {
        posibleValues && posibleValues.map((v, index) => { 

          if (typeof v === 'string') return;

          return (
            <Option optionName = {optionName} data = {v} key = {`Option-${optionName.replace(/\s/g, '')}-${index}`}/>
          )
        })
      }
    </div>
  )
}