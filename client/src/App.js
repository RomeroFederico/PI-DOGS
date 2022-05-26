import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Card from './components/Card/Card';
import HomePrototipo from './components/HomePrototipo/HomePrototipo';

import './App.css';

import * as example from './components/Card/example.json';

function App() {

  let theme = useSelector(state => state.theme);

  return (
    <div className = {`global-variables ${theme} body`}>
      <HomePrototipo />
    </div>
  );
}

export default App;