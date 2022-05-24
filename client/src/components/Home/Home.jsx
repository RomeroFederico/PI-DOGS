import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllBreeds } from '../../redux/actions/index.js';

export default function Home() {
  //const test = useSelector((state) => state.test);
  const dispatch = useDispatch();

  let handleClick = function(){
    dispatch(getAllBreeds());
  }

  return (
    <div>
      <button onClick = {handleClick}>Cargar Home</button>
    </div>
  )
};