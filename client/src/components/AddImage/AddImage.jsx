import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SmartImage from '../SmartImage/SmartImage';
import PaginateSections from '../PaginateSections/PaginateSections';
import { showModalAddImage, showModalUploadImage, changeImageOfNewDog, validatePropertyDog,
         setNextPageAnimation, changeFormCreateSection } from '../../redux/actions';

import { getDelayForPaginateAnimation } from '../../util';

import s from './AddImage.module.css';

export default function AddImage() {

  const dispatch = useDispatch();
  const { image, validImage } = useSelector(state => state.create.newDog);

  let handleOpenModal = function() {
    dispatch(showModalAddImage());
  }

  let handleOpenUpload = function() {
    dispatch(showModalUploadImage());
  }

  let handleRemoveImage = function() {
    dispatch(changeImageOfNewDog(null));
  }

  let handleNext = function() {
    if (!validImage) dispatch(validatePropertyDog('validImage'));
    dispatch(setNextPageAnimation());
    dispatch(changeFormCreateSection(6, getDelayForPaginateAnimation()));
  }

  return (
    <>
      <label className = {s.title}>- Agregar Imagen (Opcional)-</label>

      {

        !image &&

        <div className = {`${s.containerImageSelected} center`}>
          <SmartImage image = {null} alt = {'img-picked'} style = {s.imgContainer}/>
        </div>
      }

      {

        image &&
        
        <div className = {`${s.containerImageSelected} center`}>
          <SmartImage image = {image} alt = {'img-picked'} style = {s.imgContainer}/>
        </div>
      }

      <label className = {s.lblInfo}>{image ? 'Imagen Seleccionada :)' : 'Sin Imagen :('}</label>

      <div className = {s.btnContainer}>
        <button className = {s.btn} onClick = {handleOpenModal} >Seleccionar</button>
        <button className = {s.btn} onClick = {handleOpenUpload} >Subir Imagen</button>
        <button className = {s.btn} disabled = {!image} onClick = {handleRemoveImage}>Quitar</button>
      </div>

      <PaginateSections
        buttons = {["Volver", "Continuar"]}
        disableNext = {false}
        disableBack = {false}
        cbHandleNext = {handleNext}
      />
    </>
  )
}