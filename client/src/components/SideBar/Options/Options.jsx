import React from 'react';
import Option from '../Option/Option';

import s from './Options.module.css';

export default function Options({ filterServerName, filterClientName, options }) {

  return (
    <div className = {s.containerOptions}>
      <div className = {s.optionName}>
        {`:: ${filterClientName} ::`}
      </div>
      <div className = {`center ${s.options}`}>
      {
        options && options.map((option, index) => { return (
            <Option 
              optionData = {option}
              optionName = {option.serverName}
              filterServerName = {filterServerName}
              key = {`Option-${option.name}-${index}`}
            />
          )
        })
      }
      </div>
    </div>
  )
}