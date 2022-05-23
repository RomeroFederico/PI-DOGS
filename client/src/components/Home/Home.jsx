import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { testReducer, testWithDelay } from '../../redux/actions/index.js';

export default function Home() {
  const test = useSelector((state) => state.test);
  const dispatch = useDispatch();

  let handleClick = function(){
    dispatch(testWithDelay());
  }

  return (
    <div>
      <button onClick = {handleClick}>Cargar Home</button>
      {
        test && <div><h1>HOME</h1></div>
      }
    </div>
  )
};