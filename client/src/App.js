import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppLayout from './AppLayout';
import LandingPage from './components/LandingPage/LandingPage';
import HomePrototipo from './components/HomePrototipo/HomePrototipo';
import FormCreateBreed from './components/FormCreateBreed/FormCreateBreed';
import BreedDetails from './components/BreedDetails/BreedDetails';

import './App.css';


function App() {

  let theme = useSelector(state => state.theme);

  return (
    <div className = {`global-variables ${theme} body`}>
      <Routes>
        <Route exact path = '/' element = { <LandingPage /> } />
          <Route element = { <AppLayout /> }>
          <Route path = '/home' element = { <HomePrototipo /> } />
          <Route path = '/alta' element = { <FormCreateBreed /> } />
          <Route exact path = '/raza/:id' element = { <BreedDetails /> } />
          <Route path = "*" element = { <Navigate to = "/home" replace /> } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;