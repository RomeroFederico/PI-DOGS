import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getBreedDetails, closeBreedDetails } from '../../redux/actions';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import MainZoneBreedDetails from '../MainZoneBreedDetails/MainZoneBreedDetails';
import DogFace from '../SVG/DogFace/DogFace';
import { getBreedSize } from '../../util';

import s from './BreedDetails.module.css';

export default function BreedDetails() {

  const dispatch = useDispatch();
  const breedId = useParams();
  const { show , dog } = useSelector(state => state.details);
  const [ delay, setDelay ] = React.useState(true);

  React.useEffect(() => {
    dispatch(getBreedDetails(breedId.id));
    let idTimeOut = setTimeout(() => setDelay(false), 1000);
    return () => {
      dispatch(closeBreedDetails());
      clearTimeout(idTimeOut);
    }
  }, []);

  if (!dog || !show || delay) return <LoadingComponent />;

  let size = getBreedSize(dog.peso[dog.peso.length - 1]);

  return (
    <div className = {`${s.globalContainer} center`}>
      <div className = {s.containerForm}>
        <div className = {`${s.banner} BG${size}`}>
          <DogFace style = {s.dogIco}/>
          ::: Detalles de la Raza :::
        </div>
        <div className = {s.mainZone}>
          <MainZoneBreedDetails 
            nombre = {dog.nombre}
            id = {dog.id}
            peso = {dog.peso}
            altura = {dog.altura}
            temperamento = {dog.temperamento}
            añosDeVida = {dog.añosDeVida}
            imagen = {dog.imagen}
          />
        </div>
      </div>
    </div>
  );
}