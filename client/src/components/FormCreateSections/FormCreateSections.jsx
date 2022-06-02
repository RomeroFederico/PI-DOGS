import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddName from '../AddName/AddName';
import AddTemperaments from '../AddTemperaments/AddTemperaments';

import s from './FormCreateSections.module.css';

export default function FormCreateSections() {
  const dispatch = useDispatch();
  const { section } = useSelector(state => state.create);

  switch(section) {
    case 1:
      return <AddName />
    default:
      return <AddTemperaments />
  }
}