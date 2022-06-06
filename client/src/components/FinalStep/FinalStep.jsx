import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../Input/Input';
import SmartImage from '../SmartImage/SmartImage';
import PaginateSections from '../PaginateSections/PaginateSections';
import { setBackPageAnimation, changeFormCreateSection } from '../../redux/actions';

import { getDelayForPaginateAnimation } from '../../util';
import { Dog } from '../../util/validaciones';

import s from './FinalStep.module.css';

export default function FinalStep() {

  const dispatch = useDispatch();
  const { newDog, oldTemperaments, newTemperaments } = useSelector(state => state.create);

  const formatedDogValues = Dog.formatDogProperties(newDog, oldTemperaments, newTemperaments);
  const formatedTemperaments = Dog.formatTemperaments(formatedDogValues.oldTemperaments, formatedDogValues.newTemperaments);

  console.log(formatedDogValues);
  console.log(formatedTemperaments);

  let handleNext = function() {
  }

  let handleBack = function() {
    dispatch(setBackPageAnimation());
    dispatch(changeFormCreateSection(5, getDelayForPaginateAnimation()));
  }

  return (
    <>
      <label className = {s.title}>- Mostrando Datos a Subir -</label>

      {
        newDog && oldTemperaments && newTemperaments &&

        <div className = {s.containerBreedData}>
          <div className = {`${s.containerImageSelected} center`}>
            <SmartImage 
              image = {formatedDogValues.breedData.imagen} 
              alt = {'img-picked'} 
              style = {s.imgContainer}
              imageStyle = {s.imageStyle}
            />
          </div>

          <div className = {s.nameZone}>
            <label className = {s.ldlData}>Nombre</label>
            <Input value = {formatedDogValues.breedData.nombre} readOnly = {true} />
          </div>

          <div className = {s.temperamentsZone}>
            <label className = {s.ldlData}>Temperamentos</label>
            <textarea className = {s.inputTemperaments} readOnly = {true}> 
              {formatedTemperaments}
            </textarea>
          </div>

          <div className = {s.weightZone}>
            <div className = {s.divDoubleData}>
            <label className = {s.ldlData}>Peso Min (Kg)</label>
            <Input 
              value = { formatedDogValues.breedData.peso[1] ? formatedDogValues.breedData.peso[0] : '-- Vacio --' } 
              readOnly = {true} 
            />
            </div>
            <div className = {s.divDoubleData}>
            <label className = {s.ldlData}>Peso Max (Kg)</label>
            <Input 
              value = { formatedDogValues.breedData.peso[1] ? 
                        formatedDogValues.breedData.peso[1] : formatedDogValues.breedData.peso[0] 
                      } 
              readOnly = {true}
            />
            </div>
          </div>

          <div className = {s.heightZone}>
            <div className = {s.divDoubleData}>
            <label className = {s.ldlData}>Altura Min (cm)</label>
            <Input 
              value = { formatedDogValues.breedData.altura[1] ? formatedDogValues.breedData.altura[0] : '-- Vacio --' } 
              readOnly = {true} 
            />
            </div>
            <div className = {s.divDoubleData}>
            <label className = {s.ldlData}>Altura Max (cm)</label>
            <Input 
              value = { formatedDogValues.breedData.altura[1] ? 
                        formatedDogValues.breedData.altura[1] : formatedDogValues.breedData.altura[0] 
                      } 
              readOnly = {true}
            />
            </div>
          </div>

          <div className = {s.lifespanZone}>
            <label className = {s.ldlData}>Años de Vida</label>
            <Input 
              value = { formatedDogValues.breedData.añosDeVida ? formatedDogValues.breedData.añosDeVida : '-- Vacio --' } 
              readOnly = {true}
            />
          </div>
        </div>
      }

      <PaginateSections
        buttons = {["Volver", "Subir"]}
        disableNext = {false}
        disableBack = {false}
        cbHandleBack = {handleBack}
        cbHandleNext = {handleNext}
      />
    </>
  )
}