import React from 'react';

import s from './ValidatorBMI.module.css';

export default function ValidatorBMI({ imc, validMsg }) {
  return (
    <div className = {`${s.containerIsValid} ${validMsg.isValid ? s.isValid : ''}`}>
      <div className = {s.containerImc}>
        <label className = {s.imcTitle}>{imc.imc}</label>
        <label className = {s.imcSubTitle}>{imc.min}</label>
        <label className = {s.separator}></label>
        <label className = {s.imcSubTitle}>{imc.max}</label>
      </div>
      <label 
        className = {`${s.lblIsValid} ${validMsg.msg.length > 12 ? 'FONTSMALLEST' : ''}`}
      >
        {validMsg.msg}
      </label>
    </div>
  )
}