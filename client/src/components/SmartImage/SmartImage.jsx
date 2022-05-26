import React from 'react';

import s from './SmartImage.module.css';
import imageNotFound from '../../resources/image-not-found.svg';

export default function SmartImage({ image, alt }) {

  let [ errorLoadingImage, setErrorLoadingImage ] = React.useState(false);
  let [ showImage, setShowImage ] = React.useState(false);

  let handleErrorImageNotFound = function() {
    setErrorLoadingImage(true);
  }

  let handleLoadImage = function() {
    setShowImage(true);
  }

  return (
    <>
    {
      !showImage && !errorLoadingImage && 
      <div className = {`${s.loadingImage} center`}>Loading</div>
    }
    {
      !errorLoadingImage && 
      <img 
        src = {image ? image : 'NO-IMAGE'} 
        alt = {alt}
        onError = {handleErrorImageNotFound}
        onLoad = {handleLoadImage} 
        className = {`${s.image} ${ !showImage ? s.dontShowImage : '' }`}
      />
    }
    { 
      errorLoadingImage && 
      <img src = {imageNotFound} alt = {alt} className = {s.image}/> 
    }
    </>
  );
} 