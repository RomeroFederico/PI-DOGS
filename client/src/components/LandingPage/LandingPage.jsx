import React from 'react';
import { Link } from 'react-router-dom';
import HenryDogsLogo from '../SVG/HenryDogsLogo/HenryDogsLogo';
import DogPaw from '../SVG/DogPaw/DogPaw';
import backgroundImage from '../../resources/background.png';

import s from './LandingPage.module.css';

export default function LandingPage() {

  const [ delayLoading, setDelayLoading ] = React.useState(true);
  const [ stillLoadingImage, setStillLoadingImage ] = React.useState(true);

  React.useEffect(() => {
    let idTimeOut = setTimeout(() => setDelayLoading(false), 1500);
    return (() => {
      clearTimeout(idTimeOut);
    })
  }, []);

  let handleLoadImage = function() {
    setStillLoadingImage(false);
  }

  return (
    <div className = {s.containerBackground}>
      <div 
        className = {`${s.containerLanding}`}
        // style = {{ backgroundImage: `url(${backgroundImage})` }}
      >

        {
          (delayLoading || stillLoadingImage) &&

          <div className = {s.containerLoading}>
            <div className = {s.containerIco}>
              <DogPaw style = {s.loadingImage} />
            </div>
          </div>
        }

        <img 
          src = {backgroundImage}
          className = {`${s.mainImg} ${s.stillLoadingImage || delayLoading ? s.dontShowImage : s.addAnimation}`}
          onLoad = {handleLoadImage}
        />

        <div 
          className = {`${s.logoContainer} ${s.flipCard} center 
                        ${stillLoadingImage || delayLoading ? s.dontShowImage : s.addAnimation}`}>
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

        <div 
          className = {`${s.containerTitle} ${s.glassEffect} 
                        ${stillLoadingImage || delayLoading ? s.dontShowImage : s.addAnimation}`}
        >
          <span></span>
          <h5 className = {`${s.text} ${s.subTitle}`} >- Proyecto Integrador -</h5>
          <h1 className = {`${s.text} ${s.title}`} >HENRY DOGS</h1>
          <span></span>
          <h5 className = {`${s.text} ${s.subTitle}`} >- Un Proyecto de -</h5>
          <h3 className = {`${s.text} ${s.myName}`} >Romero Federico</h3>
          <span></span>
        </div>
      </div>
    </div>
  );
}