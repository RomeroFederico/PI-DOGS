import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Card from './components/Card/Card';
import HomePrototipo from './components/HomePrototipo/HomePrototipo';
import FormCreateBreed from './components/FormCreateBreed/FormCreateBreed';
import BreedDetails from './components/BreedDetails/BreedDetails';

import './App.css';

import * as example from './components/Card/example.json';

function App() {

  let theme = useSelector(state => state.theme);

  return (
    <div className = {`global-variables ${theme} body`}>
      <Routes>
        <Route path = '/' element = { <HomePrototipo /> } />
        <Route path = '/alta' element = { <FormCreateBreed /> } />
        <Route exact path = '/raza/:id' element = { <BreedDetails /> } />
      </Routes>
    </div>
  );
}

export default App;