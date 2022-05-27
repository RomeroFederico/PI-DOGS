import React from 'react';
import Card from '../Card/Card';

import WhereIsTheDog from '../SVG/WhereIsTheDog/WhereIsTheDog';

import s from './Cards.module.css';

export default function Cards({ cards }) {

  let showCards = function(cards) {
    return cards.map(c => { return (
      <Card 
        id = {c.id}
        nombre = {c.nombre}
        temperamento = {c.temperamento}
        imagen = {c.imagen}
        peso = {c.peso}
        key = {`card-breeds-${c.id}`}
      />
    )});
  }

  return (
    <div className = {s.container}>
    {
      cards.length === 0 && (
        <div className = {`${s.breedNotFoundContainer} center`}>
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