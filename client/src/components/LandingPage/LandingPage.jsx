import React from 'react';
import { Link } from 'react-router-dom';
import HenryDogsLogo from '../SVG/HenryDogsLogo/HenryDogsLogo';
import DogPaw from '../SVG/DogPaw/DogPaw';
import backgroundImage from '../../resources/background.png';

import s from './LandingPage.module.css';

export default function LandingPage() {

  const [ showLandingPage, setshowLandingPage ] = React.useState(false);
  const [ delayLoading, setDelayLoading ] = React.useState(true);

  React.useEffect(() => {
    let idTimeOut = setTimeout(() => setDelayLoading(false), 1500);
    return (() => {
      clearTimeout(idTimeOut);
    })
  }, []);

  let handleLoad = function() {
    console.log('hola');
    setshowLandingPage(true)
  }

  return (
    <div className = {s.containerBackground}>
        <div className = {s.containerLoading}>
          <div className = {s.containerIco}>
            <DogPaw style = {s.loadingImage} />
          </div>
        </div>
      {
        !delayLoading && 
        <div 
          className = {`${s.containerLanding}`}
          style = {{ backgroundImage: `url(${backgroundImage})` }}
        >
          
          <div className = {`${s.logoContainer} ${s.flipCard} center`}>
            <div className = {s.flipCardInner}>
              <div className = {`${s.flipCardFront} ${s.glassEffect}`}>
                <div className = {s.iconContainer}>
                  <HenryDogsLogo />
                </div>
              </div>
              <div className = {`${s.flipCardBack} center`} >
                <Link to = '/home'>
                  <button className = {`${s.buttonHenry} ${s.glassEffect}`}>ENTER</button>
                </Link>
              </div>
            </div>
          </div>

          <div className = {`${s.containerTitle} ${s.glassEffect}`}>
            <span></span>
            <h5 className = {`${s.text} ${s.subTitle}`} >- Proyecto Integrador -</h5>
            <h1 className = {`${s.text} ${s.title}`} >HENRY DOGS</h1>
            <span></span>
            <h5 className = {`${s.text} ${s.subTitle}`} >- Un Proyecto de -</h5>
            <h3 className = {`${s.text} ${s.myName}`} >Romero Federico</h3>
            <span></span>
          </div>

        </div>
      }
    </div>
  );
}