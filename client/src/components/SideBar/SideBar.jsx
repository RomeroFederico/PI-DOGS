import React from 'react';
import Options from './Options/Options';
import OptionTemperaments from './OptionTemperaments/OptionTemperaments'
import { useSelector } from 'react-redux';
import { paramsComponents } from '../SVG/Params';
import { getFilters } from '../../util';

import s from './SideBar.module.css';

export default function SideBar() {

  const myRef = React.useRef(null);
  const cards = useSelector(state => state.home.breeds);
  const filters = getFilters();

  const executeScroll = () => myRef.current.scrollIntoView();

  React.useEffect(() => {
    executeScroll();
  }, [cards]);

  let options = filters.map((param, index)=> { return (

    <Options
      filterServerName = { param.serverName }
      filterClientName = { param.clientName }
      options = { param.options }
      key = {`Options-${param.name}-${index}`}
    />
  )})

  return (
    <div className = {s.containerSideBar} ref = {myRef}>
      <OptionTemperaments />
      {
        options.length > 0 && options
      }
    </div>
  )
}