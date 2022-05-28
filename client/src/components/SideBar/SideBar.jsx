import React from 'react';
import Options from './Options/Options';
import  { paramsComponents } from '../SVG/Params';
import { getFilters } from '../../util';

import s from './SideBar.module.css';

export default function SideBar() {

  //let [ filterParams, setFilterParams ] = React.useState(false);
  const filters = getFilters();

  let options = filters.map((param, index)=> { return (

    <Options
      filterName = { param.name }
      options = { param.options }
      key = {`Options-${param.name}-${index}`}
    />
  )})

  return (
    <div className = {s.containerSideBar}>
    {
      options.length > 0 && options
    }
    </div>
  )
}