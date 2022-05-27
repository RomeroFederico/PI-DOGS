import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBreedsWithPaginate, getTemperaments, showHome, resetHome, changeTheme} from '../../redux/actions/index.js';

//import Card from '../Card/Card';
import Cards from '../Cards/Cards';
import SideBar from '../SideBar/SideBar';

import s from './HomePrototipo.module.css';

export default function HomePrototipo() {
  const home = useSelector(state => state.home);
  const dispatch = useDispatch();
  const [ temperaments, setTemperament ] = React.useState("");
  const [ order, setOrder ] = React.useState('ascending');
  const [ sort, setSort ] = React.useState('nombre');
  const [ filter, setFilter ] = React.useState('');

  let btnPages;

  React.useEffect(() => {
    dispatch(getBreedsWithPaginate());
    dispatch(getTemperaments());

    return () => {
      dispatch(resetHome())
    }
  }, [])

  React.useEffect(() => {
    if (!home.show && home.temperaments.length > 0 && home.breeds.length > 0) dispatch(showHome())
  }, [home])

  if (!home.show) return <span>Loading</span>

  let buildBtnPages = function(pages) {
    let jsx = []

    for(let i = 1; i <= pages; i++) {
      jsx.push(
        <button 
          onClick = {handleClick}
          name = {i}
          key = {`btn-page-${i}`}
          disabled = { home.currentPage === i ? true : false }
        >
        {i}
        </button>
      );
    }

    return jsx;
  }

  let handleClick = function(e) {
    let { name } = e.target;
    dispatch(getBreedsWithPaginate(Number(name), {
      sort: sort,
      order: order,
      filter: filter,
      temperaments: temperaments
    }));
  }

  let handleClickTemp = function(searhTemperaments) {
    if (temperaments === searhTemperaments) return;
    setTemperament(searhTemperaments);
    dispatch(getBreedsWithPaginate(1, {
      sort: sort,
      order: order,
      filter: filter,
      temperaments: searhTemperaments
    }));
  }

  let handleSelect = function(e) {
    let { name, value } = e.target;
    if (name === 'order') setOrder(value);
    if (name === 'sort') setSort(value);
    if (name === 'filter') setFilter(value);
    dispatch(getBreedsWithPaginate(1, {
      sort: sort,
      order: order,
      filter: filter,
      [name]: value,
      temperaments: temperaments
    }));
  }

  let handleChangeTheme = function() {
    dispatch(changeTheme());
  }

  btnPages = buildBtnPages(home.pages);

  return (
    <>
    <div className = {s.divContenedor}>
      <ol className = {s.olTemperaments}>
      {
        home.temperaments.map(t => { return (
          <li 
            className = { temperaments !== t.nombre ? s.liTemperaments : s.liTempDisabled }
            key = {`li-temp-${t.id}`}
            onClick = {() => handleClickTemp(t.nombre)}
          >
          {t.nombre}
          </li>
        )})
      }
      </ol>
      <div className = {s.cards}>

        {/*{
          home.breeds.length === 0 && <span>No se encontraron razas</span>
        }
        {
          home.breeds.length > 0 && home.breeds.map(b => { return (
            // <li className = {s.liBreeds} key = {`li-breeds-${b.id}`}>
            //   <ul>
            //   {
            //     Object.keys(b).map(prop => { return (
            //       <li key = {`li-${prop}-${b.id}`}>{`${prop}: ${b[prop]}`}</li>
            //     )})
            //   }
            //   </ul>
            // </li>
            <Card 
              key = {`card-breeds-${b.id}`}
              nombre = {b.nombre}
              temperamento = {b.temperamento}
              peso = {b.peso}
              id = {b.id}
              imagen = {b.imagen}
            />
          )})
        }*/}

        <Cards cards = {home.breeds} />

      </div>
    </div>
    {btnPages}
    <h5>Page: {home.currentPage}</h5>
    <select
      name = 'order'
      value = {order}
      onChange = {handleSelect}
    >
      <option value = "ascending">Ascendente</option>
      <option value = "descending">Descendente</option>
    </select>

    <select
      name = 'sort'
      value = {sort}
      onChange = {handleSelect}
    >
      <option value = "nombre">Por Nombre</option>
      <option value = "peso">Por Peso</option>
    </select>

    <select
      name = 'filter'
      value = {filter}
      onChange = {handleSelect}
    >
      <option value = "">Ambos</option>
      <option value = "api">Solo originales</option>
      <option value = "db">Solo creados</option>
    </select>
    <button onClick = {handleChangeTheme}>Cambiar Tema</button>
    <SideBar />
    </>
  )
};