import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBreedsWithPaginate, getTemperaments, showHome, resetHome} from '../../redux/actions/index.js';

import s from './Home.module.css';

export default function Home() {
  const home = useSelector(state => state.home);
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  const [temperament, setTemperament] = React.useState("Playful");

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
          disabled = { page === i ? true : false }
        >
        {i}
        </button>
      );
    }

    return jsx;
  }

  let handleClick = function(e) {
    let { name } = e.target;
    setPage(Number(name))
    dispatch(getBreedsWithPaginate(Number(name), {
      sort: 'peso',
      order: 'descending',
      filter: null,
      temperaments: temperament
    }));
  }

  let handleClickTemp = function(nombre) {
    if (temperament === nombre) return;
    setPage(1);
    setTemperament(nombre);
    dispatch(getBreedsWithPaginate(1, {
      sort: 'nombre',
      order: 'ascending',
      filter: null,
      temperaments: nombre
    }));
  }

  btnPages = buildBtnPages(home.pages);

  return (
    <>
    <div className = {s.divContenedor}>
      <ol className = {s.olTemperaments}>
      {
        home.temperaments.map(t => { return (
          <li 
            className = { temperament !== t.nombre ? s.liTemperaments : s.liTempDisabled }
            key = {`li-temp-${t.id}`}
            onClick = {() => handleClickTemp(t.nombre)}
          >
          {t.nombre}
          </li>
        )})
      }
      </ol>
      <ol>
      {
        home.breeds.length > 0 && home.breeds.map(b => { return (
          <li className = {s.liBreeds} key = {`li-breeds-${b.id}`}>
            <ul>
            {
              Object.keys(b).map(prop => { return (
                <li key = {`li-${prop}-${b.id}`}>{`${prop}: ${b[prop]}`}</li>
              )})
            }
            </ul>
          </li>
        )})
      }
      </ol>
    </div>
    {btnPages}
    <h5>Page: {page}</h5>
    </>
  )
};