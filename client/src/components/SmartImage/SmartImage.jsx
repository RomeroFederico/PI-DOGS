import React from 'react';

import s from './SmartImage.module.css';
import ImageNotFound from '../SVG/ImageNotFound/ImageNotFound';
import DogPaw from '../SVG/DogPaw/DogPaw';

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
      <div className = {`${s.loadingImageContainer} center`}>
        <DogPaw style = {s.loadingImage}/>
      </div>
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
      // <img src = {imageNotFound} alt = {alt} className = {s.image}/>
      <div className = {`center ${s.imageContainer}`}>
        <ImageNotFound style = {s.imageNotFound}/>
      </div>
    }
    </>
  );
} 