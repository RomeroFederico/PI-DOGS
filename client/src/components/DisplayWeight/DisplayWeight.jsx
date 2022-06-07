import React from 'react';

import s from './DisplayWeight.module.css';

export default function DisplayWeight({ weight, varSize }) {

  const [ maxWeight, setMaxWeight ] = React.useState(0);
  const [ showWeight, setShowWeight ] = React.useState(0);
  const miliSeconsBetweenUnits = 1000 / weight;

  React.useEffect(() => {
    let idTimeOut = setTimeout(() => setMaxWeight(weight), 100);
    return (() => {
      clearTimeout(idTimeOut);
    })
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => setShowWeight(showWeight => showWeight + 1), miliSeconsBetweenUnits);
    if (showWeight === weight) clearInterval(interval);
    return () => clearInterval(interval);    
  }, [showWeight]);

  return (
    <div className = {s.containerMeasure} style = {{ '--r': `${maxWeight}`}}>
      <div className = {`${s.measure} ${varSize ? varSize : ''}`}>
      </div>
      <div className = {s.containerNumbers}>
        <div className = {s.min}>0</div>
        <div className = {s.current}>{showWeight}<i>Kg</i></div>
        <div className = {s.max}>100</div>
      </div>
    </div>
  );
}