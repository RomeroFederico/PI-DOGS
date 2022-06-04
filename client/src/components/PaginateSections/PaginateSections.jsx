import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeFormCreateSection, setBackPageAnimation, setNextPageAnimation } from '../../redux/actions';
import { getDelayForPaginateAnimation } from '../../util/';

import s from './PaginateSections.module.css';

export default function PaginateSections({ buttons, disableNext, disableBack, cbHandleNext = null, cbHandleBack = null}) {

  const dispatch = useDispatch();
  const { section } = useSelector(state => state.create);

  let handleNextPage = function() {
    dispatch(setNextPageAnimation());
    dispatch(changeFormCreateSection(section + 1, getDelayForPaginateAnimation()));
  }

  let handleBackPage = function() {
    dispatch(setBackPageAnimation());
    dispatch(changeFormCreateSection(section - 1, getDelayForPaginateAnimation()));
  }

  return (
    <div className = {`center ${s.btnZone}`}>
      <button 
        className = {`${s.btn} ${disableBack ? '' : s.enabled}`}
        onClick = { cbHandleBack ? cbHandleBack : handleBackPage }
        disabled = {disableBack}
       >
        {`< ${buttons[0]}`}
      </button>
      <button 
        className = {`${s.btn} ${disableNext ? '' : s.enabled}`}
        onClick = { cbHandleNext ? cbHandleNext : handleNextPage }
        disabled = {disableNext}
       >
        {`${buttons[1]} >`}
      </button>
    </div>
  );
}