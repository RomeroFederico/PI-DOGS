import React from 'react';
import { getImageComponent } from '../../../util';
import { paramsComponents } from '../../SVG/Params';

import s from './Option.module.css';

export default function Option({ optionData }) {

  let imageComponent = getImageComponent(optionData, paramsComponents);

  return (
    <div className = {s.optionContainer}>
      <div className = {`center ${s.optionImageContainer}`}>
        <div className = {`${s.optionImage}`}>
        {
          imageComponent && imageComponent
        }
        {
          !imageComponent && <span>⚙</span>
        }
        </div>
      </div>

      <div className = {s.optionText}>
        {optionData.clientName}
      </div>
    </div>
  );
}