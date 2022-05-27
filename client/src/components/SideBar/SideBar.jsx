import React from 'react';
import Options from './Options/Options';
import  { paramsComponents } from '../SVG/Params';
import { getFilters, mapComponents } from '../../util';

import s from './SideBar.module.css';

export default function SideBar() {

  //let [ filterParams, setFilterParams ] = React.useState(false);
  const filterParams = paramsComponents.reduce(mapComponents, getFilters());

  let options = Object.keys(filterParams).map((param, index)=> { return (

    <Options
      optionName = { filterParams[param].name }
      posibleValues = { Object.keys(filterParams[param]).map(p => filterParams[param][p]) }
      key = {`Options-${param}-${index}`}
    />
  )})

  return (
    <> 
    {
      options.length > 0 && options
    }
    </>
  )
}