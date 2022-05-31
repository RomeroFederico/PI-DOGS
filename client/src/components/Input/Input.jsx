import React from 'react';

import s from './Input.module.css';

export default function Input({ value, placeholder, handleInput, search, style }) {

  let handlePaste = function(e) {
    e.preventDefault();
  }

  return (
    <div className = {s.containerInput}>
      <input 
        type = 'text'
        className = {`${s.input} ${style ? style : ''}`}
        placeholder = {placeholder}
        onInput = {handleInput}
        onPaste = {handlePaste}
        value = {value}
      />
    </div>
  );
}