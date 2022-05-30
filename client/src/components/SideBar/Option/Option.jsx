import React from 'react';
import { getImageComponent } from '../../../util';
import { paramsComponents } from '../../SVG/Params';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterData, resetBreeds, getBreedsWithPaginate, getBreedsWithPaginateLocal } from '../../../redux/actions/index.js';

import s from './Option.module.css';

export default function Option({ optionData, optionName, filterServerName }) {

  let dispatch = useDispatch();
  let { filterData, localBreeds } = useSelector(state => state.home);
  let imageComponent = getImageComponent(optionData, paramsComponents);

  let handleClick = function() {
    let newFilterData = {
      ...filterData,
      [filterServerName]: optionData.serverName,
    };
    dispatch(setFilterData(newFilterData));
    dispatch(resetBreeds());
    if (localBreeds) dispatch(getBreedsWithPaginateLocal(1, newFilterData));
    else dispatch(getBreedsWithPaginate(1, newFilterData));
  }

  let isSelected = function() {
    return filterData[filterServerName] === optionData.serverName;
  }

  let getClassName = function() {
    return isSelected() ? s.selected : s.noSelected;
  }

  return (
    <div className = {`${s.optionContainer} ${getClassName()}`} onClick = { !isSelected() ? handleClick : null }>
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