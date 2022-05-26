import React from 'react';

import s from './SmartImage.module.css';
import ImageNotFound from '../SVG/ImageNotFound/ImageNotFound';
import DogPaw from '../SVG/DogPaw/DogPaw';

export default function SmartImage({ image, alt, style }) {

  let [ errorLoadingImage, setErrorLoadingImage ] = React.useState(false);
  let [ showImage, setShowImage ] = React.useState(false);
  let [ delayLoading, setDelayLoading ] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setDelayLoading(false), Math.random() * 400 + 1500);
  }, []);

  let handleErrorImageNotFound = function() {
    setErrorLoadingImage(true);
  }

  let handleLoadImage = function() {
    setShowImage(true);
  }

  return (
    <>
    {
      ((!showImage && !errorLoadingImage) || delayLoading) && 
      <div className = {`${s.loadingImageContainer} center`}>
        <DogPaw style = {s.loadingImage} fill = {style} />
      </div>
    }
    {
      !errorLoadingImage &&
      <img 
        src = {image ? image : 'NO-IMAGE'} 
        alt = {alt}
        onError = {handleErrorImageNotFound}
        onLoad = {handleLoadImage} 
        className = {`${s.image} ${ !showImage || delayLoading ? s.dontShowImage : '' }`}
      />
    }
    { 
      errorLoadingImage && !delayLoading &&
      <div className = {`center ${s.imageContainer}`}>
        <ImageNotFound style = {`${s.imageNotFound} ${style}`}/>
      </div>
    }
    </>
  );
} 