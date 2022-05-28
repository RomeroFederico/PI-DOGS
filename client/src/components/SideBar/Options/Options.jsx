import React from 'react';
import Option from '../Option/Option';

import s from './Options.module.css';

export default function Options({ filterName, options }) {

  return (
    <div className = {s.containerOptions}>
      <div className = {s.optionName}>
        {`-- ${filterName} --`}
      </div>
      <div className = {`center ${s.options}`}>
      {
        options && options.map((option, index) => { return (
            <Option 
              optionData = {option}
              key = {`Option-${option.name}-${index}`}
            />
          )
        })
      }
      </div>
    </div>
  )
}