import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { closeModalOnUpload, showFormCreateNewDog, getTemperaments } from '../../redux/actions';

import s from './ModalOnUpload.module.css';

export default function ModalOnUpload() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { modalOnUpload } = useSelector(state => state);
  const { newDog } = useSelector(state => state.create);

  let handleBackHome = function(){
    dispatch(closeModalOnUpload());
    navigate('./home', { replace: true });
  }

  let handleCreateAnother = function(){
    dispatch(closeModalOnUpload());
    dispatch(showFormCreateNewDog());
    dispatch(getTemperaments());
  }

  let handleBackToTheForm = function(){
    dispatch(closeModalOnUpload());
  }

  return (
    <div className = {`${s.background} center`}>
      <div className = {s.modal}>
        <div className = {s.modalTitle}>
          <span className = {s.title}>:: Resultado ::</span>
          {
            modalOnUpload && !modalOnUpload.status &&
            <button className = {s.closeModal} onClick = {handleBackToTheForm}>x</button>
          }
        </div>

        <div className = {s.result}>
        {
          modalOnUpload && newDog && modalOnUpload.error && 
          (
            <>
              <div className = {s.invalid}>
                404
              </div>
              <span className = {s.info}>- Error en el Servidor -</span>
              <span className = {s.subInfo}>En caso de persistir, vuelva a intentarlo mas tarde.</span>
            </>
          )
        }
        {
          modalOnUpload && newDog && modalOnUpload.status && 
          (
            <>
              <div className = {s.valid}>
                ✔
              </div>
              <span className = {s.info}>- Exito en el Alta -</span>
              <span className = {s.subInfo}>{`Se ha subido con exito la raza '${newDog.name}' !`}</span>
            </>
          )
        }
        {
          modalOnUpload && newDog && !modalOnUpload.error && !modalOnUpload.status &&
          (
            <>
              <div className = {s.invalid}>
                X
              </div>
              <span className = {s.info}>- Error: Nombre ya en Uso -</span>
              <span className = {s.subInfo}>
                {`El nombre de la raza '${newDog.name}' ya se encuentra en uso. Vuelva y cambie el nombre de la raza.`}
              </span>
            </>
          )
        }
        </div>

        <div className = {`${s.divOptions} center`}>
          <button className = {s.btnHome} onClick = {handleBackHome}>Ir al Inicio</button>
          {
            modalOnUpload && modalOnUpload.status &&
            <button className = {s.btnRetry} onClick = {handleCreateAnother}>Crear Otro</button>
          }
          {
            modalOnUpload && !modalOnUpload.status &&
            <button className = {s.btnRetry} onClick = {handleBackToTheForm}>Volver al Form</button>
          }
        </div>
      </div>
    </div>
  );
}