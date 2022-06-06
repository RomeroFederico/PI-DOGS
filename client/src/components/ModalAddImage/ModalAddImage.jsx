import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeImageOfNewDog, closeModalAddImage } from '../../redux/actions';
import SmartImage from '../SmartImage/SmartImage';

import s from './ModalAddImage.module.css';
import { getDefaultImages } from '../../util';

export default function ModalAddImage() {

  const dispatch = useDispatch();
  const { image } = useSelector(state => state.create.newDog);
  const [ imageSelected, setImageSelected ] = React.useState(null); 
  const defaultImages = getDefaultImages();

  React.useEffect(() => {
    if (image) setImageSelected(image);
  }, []);

  let handleSelectImage = function(picked) {
    if (picked !== imageSelected) setImageSelected(picked);
  }

  let handleClose = function() {
    dispatch(closeModalAddImage());
  }

  let handleClick = function() {
    dispatch(changeImageOfNewDog(imageSelected));
    dispatch(closeModalAddImage());
  }

  return (
    <div className = {`${s.background} center`}>
      <div className = {s.modal}>
        <div className = {s.modalTitle}>
          <span className = {s.title}>:: Seleccionar Imagen ::</span>
          <button className = {s.closeModal} onClick = {handleClose}>x</button>
        </div>

        <div className = {s.containerImages}>
        {
          defaultImages && defaultImages.map((defaultImage, index) => 

            <div 
              className = {`${s.imgContainer} ${defaultImage.url === imageSelected ? s.selected : ''}`}
              key = {`imgContainer-${defaultImage.name}-${index}`}
              onClick = {() => handleSelectImage(defaultImage.url)}
            >
              <SmartImage 
                image = {defaultImage.url}
                alt = {defaultImage.name}
                style = {s.imgFill}
                key = {`SmartImage-${defaultImage.name}-${index}`}
                imageStyle = {s.imageStyle}
              />
            </div>
          )
        }
        </div>

        <div className = {`${s.divOptions} center`}>
          <button className = {s.btnCancel} onClick = {handleClose}>Cancelar</button>
          <button className = {s.btnCreate} onClick = {handleClick}>Aceptar</button>
        </div>
      </div>
    </div>
  );
}