import React from 'react';

import s from './Option.module.css';

export default function Option({ optionName, data }) {

  return (
    <div className = {s.optionContainer}>
      <div className = {'center'}>
        <input 
          type = "radio"
          name = {optionName}
          value = {data.serverName}
          className = {s.radioOption}
        />
      </div>
      <div className = {'center'}>
        <div className = {`${s.optionImage}`}>
        {
          data.imageComponent.component
        }
        </div>
      </div>

      <div className = {s.optionText}>
        {data.clientName}
      </div>
    </div>
  );
}