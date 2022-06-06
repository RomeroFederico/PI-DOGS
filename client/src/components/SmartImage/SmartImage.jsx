import React from 'react';

import s from './SmartImage.module.css';
import ImageNotFound from '../SVG/ImageNotFound/ImageNotFound';
import DogPaw from '../SVG/DogPaw/DogPaw';

export default function SmartImage({ image, alt, style, imageStyle }) {

  let [ errorLoadingImage, setErrorLoadingImage ] = React.useState(false);
  let [ showImage, setShowImage ] = React.useState(false);
  let [ delayLoading, setDelayLoading ] = React.useState(true);

  let idTimeOut;

  React.useEffect(() => {
    let idTimeOut = setTimeout(() => setDelayLoading(false), Math.random() * 400 + 1500);
    return (() => {
      clearTimeout(idTimeOut);
    })
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
      <div className = {`${s.loadingImageContainer} ${imageStyle ? imageStyle : ''} center`}>
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
        className = {`${s.image} ${ !showImage || delayLoading ? s.dontShowImage : '' } ${imageStyle ? imageStyle : ''}`}
      />
    }
    { 
      errorLoadingImage && !delayLoading &&
      <div className = {`center ${s.imageContainer} ${imageStyle ? imageStyle : ''}`}>
        <ImageNotFound style = {`${s.imageNotFound} ${style}`}/>
      </div>
    }
    </>
  );
} 