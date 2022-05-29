import React from 'react';
import Card from '../Card/Card';
import { useSelector } from 'react-redux';

import WhereIsTheDog from '../SVG/WhereIsTheDog/WhereIsTheDog';
import DogPaw from '../SVG/DogPaw/DogPaw';

import s from './Cards.module.css';

export default function Cards({ cards, style }) {

  const loading = useSelector(state => state.loading);

  let showCards = function(cards) {
    return cards.map((c, index )=> { return (
      <Card 
        id = {c.id}
        nombre = {c.nombre}
        temperamento = {c.temperamento}
        imagen = {c.imagen}
        peso = {c.peso}
        key = {`card-breeds-${c.id}`}
        delay = {index}
      />
    )});
  }

  return (
    <div className = {`${s.container} ${style}`}>
    {
      loading && (
        <div className = {`center ${s.loadingImageContainer}`}>
          <DogPaw style = {s.loadingImage} fill = {s.fillLoadingImage} />
        </div>
      )
    }
    {
      cards.length === 0 && !loading && (
        <div className = {`center ${s.breedNotFoundContainer}`}>
          <WhereIsTheDog />
          <h1 className = {s.notFoundTitle}>No Se Encontraron Razas</h1>
        </div>
      )
    }
    {
      cards.length > 0 && 
      <div className = {s.gridCards}>
      {
        showCards(cards)
      }
      </div>
    }
    </div>
  );
}