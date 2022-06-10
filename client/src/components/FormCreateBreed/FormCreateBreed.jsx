import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoadingComponent from '../LoadingComponent/LoadingComponent';
import PropertiesTab from '../PropertiesTab/PropertiesTab';
import FormCreateSections from '../FormCreateSections/FormCreateSections';
import ModalError from '../ModalError/ModalError';
import ModalTemperamentsForTheForm from '../ModalTemperamentsForTheForm/ModalTemperamentsForTheForm';
import ModalCreateTemperament from '../ModalCreateTemperament/ModalCreateTemperament';
import ModalAddImage from '../ModalAddImage/ModalAddImage';
import ModalOnUpload from '../ModalOnUpload/ModalOnUpload';
import Loading from '../Loading/Loading';

import { showFormCreateNewDog, getTemperaments, closeFormCreateNewDog } from '../../redux/actions';

import s from './FormCreateBreed.module.css';

export default function FormCreateBreed() {

  const dispatch = useDispatch();
  const { newDog, show } = useSelector(state => state.create);
  const { allTemperaments } = useSelector(state => state);
  const showModalError = useSelector(state => state.modalError.show);
  const showModalAddTemperament = useSelector(state => state.modalAddTemperaments.show);
  const showModalCreateTemperament = useSelector(state => state.modalCreateTemperament.show);
  const showModalAddImage = useSelector(state => state.modalAddImage.show);
  const showModalOnUpload = useSelector(state => state.modalOnUpload.show);

  const [ delay, setDelay ] = React.useState(true);

  React.useEffect(() => {
    dispatch(showFormCreateNewDog());
    dispatch(getTemperaments());

    let idTimeOut = setTimeout(() => setDelay(false), 1000);

    return () => {
      dispatch(closeFormCreateNewDog());
      clearTimeout(idTimeOut);
    }
  }, []);

  if (showModalError) return <ModalError />;

  else if (!newDog || !show || !allTemperaments || allTemperaments.length === 0 || delay ) return <LoadingComponent />;

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
          {
            showModalAddImage && <ModalAddImage />
          }
          {
            showModalOnUpload && <ModalOnUpload />
          }
        </div>
      </div>
    </div>
  );
}