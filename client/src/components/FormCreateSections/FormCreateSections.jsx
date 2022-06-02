import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddName from '../AddName/AddName';
import AddTemperaments from '../AddTemperaments/AddTemperaments';
import { setBackPageAnimation } from '../../redux/actions';

import s from './FormCreateSections.module.css';

export default function FormCreateSections() {
  const { section, animateNextPage, animateBackPage } = useSelector(state => state.create);
  let sectionToShow;

  switch(section) {
    case 1:
      sectionToShow = <AddName />;
      break;
    default:
      sectionToShow = <AddTemperaments />;
  }

  return (
    <div className = {`center ${s.container} ${animateNextPage ? 'fadeOutRight' : ''} ${animateBackPage ? 'fadeInRight' : ''} `}>
      <div className = {`${s.blockButtons} ${animateNextPage || animateBackPage ? s.enabled : ''}`}>
      </div>
      { sectionToShow }
    </div>
  )
}