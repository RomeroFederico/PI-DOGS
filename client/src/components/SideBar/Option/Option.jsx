import React from 'react';
import { getImageComponent } from '../../../util';
import { paramsComponents } from '../../SVG/Params';
import { useSelector, useDispatch } from 'react-redux';
import { getBreedsWithPaginate } from '../../../redux/actions/index.js';

import s from './Option.module.css';

export default function Option({ optionData, optionName, filterServerName }) {

  let dispatch = useDispatch();
  let { filter } = useSelector(state => state.home);
  let imageComponent = getImageComponent(optionData, paramsComponents);

  let handleClick = function() {
    dispatch(getBreedsWithPaginate(1, {
      ...filter,
      [filterServerName]: optionData.serverName
    }));
  }

  return (
    <div className = {s.optionContainer} onClick = {handleClick}>
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