import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropertiesTab from '../PropertiesTab/PropertiesTab';
import FormCreateSections from '../FormCreateSections/FormCreateSections';
import ModalTemperamentsForTheForm from '../ModalTemperamentsForTheForm/ModalTemperamentsForTheForm';
import ModalCreateTemperament from '../ModalCreateTemperament/ModalCreateTemperament';
import Loading from '../Loading/Loading';
import { initializeNewDog, getTemperaments } from '../../redux/actions';

import s from './FormCreateBreed.module.css';

export default function FormCreateBreed() {

  const dispatch = useDispatch();
  const { newDog } = useSelector(state => state.create);
  const { allTemperaments } = useSelector(state => state);
  const showModalAddTemperament = useSelector(state => state.modalAddTemperaments.show);
  const showModalCreateTemperament = useSelector(state => state.modalCreateTemperament.show);

  React.useEffect(() => {
    dispatch(initializeNewDog());
    dispatch(getTemperaments());
  }, []);

  if (!newDog || !allTemperaments || allTemperaments.length === 0) return <span>Loading</span>;

  return (
    <div className = {`${s.globalContainer} center`}>
      <div className = {s.containerForm}>
        <div className = {s.banner}>
          ::: Alta de Raza :::
        </div>
        <PropertiesTab />
        <div className = {s.mainZone}>
          <Loading style = {s.loading}/>
          <FormCreateSections />
          {
            showModalAddTemperament && <ModalTemperamentsForTheForm />
          }
          {
            showModalCreateTemperament && <ModalCreateTemperament />
          }
        </div>
      </div>
    </div>
  );
}