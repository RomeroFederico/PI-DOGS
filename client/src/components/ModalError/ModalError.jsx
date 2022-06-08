import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector ,useDispatch } from 'react-redux';
import { closeErrorMessage } from '../../redux/actions';
import WhereIsTheDog from '../SVG/WhereIsTheDog/WhereIsTheDog';

import s from './ModalError.module.css';

export default function ModalError() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { modalError } = useSelector(state => state);

  let handleBackHome = function(){
    dispatch(closeErrorMessage());
    navigate('./home', { replace: true });
  }

  return (
    <div className = {`${s.background} center`}>
      <div className = {s.modal}>
        <div className = {s.modalTitle}>
          <span className = {s.title}>:: Error ::</span>
        </div>

        <div className = {s.result}>
        {
          modalError && modalError.type === 'SERVER' && 
          (
            <>
              <div className = {s.invalid}>
                404
              </div>
              <span className = {s.subInfo}>{modalError.msg}</span>
            </>
          )
        }
        {
          modalError && modalError.type === 'NOTFOUND' && 
          <div className = {`center ${s.breedNotFoundContainer}`}>
            <WhereIsTheDog />
            <span className = {s.info}>{modalError.msg}</span>
          </div>
        }
        </div>

        <div className = {`${s.divOptions} center`}>
          <button className = {s.btnHome} onClick = {handleBackHome}>Ir al Inicio</button>
        </div>
      </div>
    </div>
  );
}