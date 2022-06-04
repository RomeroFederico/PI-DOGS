import React from 'react';
import InputSize from '../InputSize/InputSize';
import ValidatorBMI from '../ValidatorBMI/ValidatorBMI';

import s from './InputsSize.module.css';

export default function InputsSize({ size, imc, validMsg, handleInput, handleCheck }) {

  if (!size || !imc) return <></>;

  let showInputs = (() => {
    let result = Object.keys(size).map((property, index) => <InputSize 
              key = {`InputSize-${property}-${index}`}
              size = {size[property]}
              propertyName = {property}
              handleInput = {handleInput}
              handleCheck = {handleCheck}
            />);
    result.splice(2, 0, <ValidatorBMI 
              imc = {imc} 
              validMsg = {validMsg}
              key = {`InputSize-ValidatorBMI-2`}
            />);
    return result;
  })();

  return (
    <div className = {s.inputZone}>
    {showInputs}  
    </div>
  );
}