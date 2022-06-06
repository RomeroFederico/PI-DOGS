import React from 'react';
import { useSelector } from 'react-redux';
import PropertyTab from '../PropertyTab/PropertyTab';
import { tabsComponents } from '../SVG/Tabs';
import { Dog } from '../../util/validaciones';
import { getImageComponent } from '../../util';

import s from './PropertiesTab.module.css';

export default function PropertiesTab() {

  const { newDog } = useSelector(state => state.create);
  const properties = Dog.getPropertiesNameForTabs();

  let getIcon = function(tab) {
    return getImageComponent(tab, tabsComponents);
  }

  return (
    <div className = {s.containerTabs}>
      {
        newDog && properties.map((p, index)=> { return (

          <PropertyTab 
            key = {`tab-${p.clientName}-${index}`}
            name = {p.clientName}
            isPropertyValid = {p.isPropertyValid}
            imageComponent = {getIcon(p)}
            correspondingSection = {p.section}
          />

        )})
      }
    </div>
  );
}