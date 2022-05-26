import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Card from './components/Card/Card';
import HomePrototipo from './components/HomePrototipo/HomePrototipo';

import './App.css';

import * as example from './components/Card/example.json';

function App() {
  return (
    <div className = {'global-variables'}>
      <HomePrototipo />
    </div>
  );
}

export default App;