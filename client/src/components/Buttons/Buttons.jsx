import React from 'react';

import s from './Buttons.module.css';

export default function Buttons({ buttons, next, back, disableNext, disableBack }) {
  return (
    <div className = {`center ${s.btnZone}`}>
      <button className = {`${s.btn} ${disableBack ? '' : s.enabled}`} onClick = {back} disabled = {disableBack}>
        {`< ${buttons[0]}`}
      </button>
      <button className = {`${s.btn} ${disableNext ? '' : s.enabled}`} onClick = {next} disabled = {disableNext}>
        {`${buttons[1]} >`}
      </button>
    </div>
  );
}