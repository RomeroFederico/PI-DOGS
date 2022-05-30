import { FILTER_CONSTANTS } from './constants';

const checkEmptyData = function(data) {
  let keys = Object.keys(data);
  keys.forEach(k => data[k] === '' ? data[k] = null : null);
}

export const filterLocalBreeds = function(breeds, filterData, page) {
  checkEmptyData(filterData);
  let { sort, order, filter, temperaments } = filterData;

  if (!page) page = 1;
  if (!sort) sort = FILTER_CONSTANTS.SORT_BY_NAME;
  if (!order) order = FILTER_CONSTANTS.ASCENDING;
  if (!filter) filter = temperaments ? FILTER_CONSTANTS.FILTER_ONLY_TEMP : FILTER_CONSTANTS.NO_FILTER;

  if (temperaments) temperaments = temperaments.toUpperCase().split(FILTER_CONSTANTS.TEMPERAMENTS_SEPARATOR);

  sort = sort.toUpperCase();
  order = order.toUpperCase();
  filter = filter.toUpperCase();

  if (filter !== FILTER_CONSTANTS.NO_FILTER) breeds = breeds.filter(filterBreeds(filter, temperaments));

  sortBreeds(breeds, sort, order);

  let pages = Math.ceil(breeds.length / 8);
  breeds = breeds.slice((page - 1) * 8, page * 8);

  return { 
    breeds,
    pages
  };
}

let sortBreeds = function(breeds, property, asc = FILTER_CONSTANTS.ASCENDING) {

  breeds.sort((curr, next)=> {
    if (property === FILTER_CONSTANTS.SORT_BY_NAME) 
      return asc === FILTER_CONSTANTS.DESCENDING ? sortDesc(curr.nombre, next.nombre) : sortAsc(curr.nombre, next.nombre);
    else if (asc === FILTER_CONSTANTS.DESCENDING) 
      return sortDesc(curr.peso[curr.peso.length - 1], next.peso[next.peso.length - 1]);
    else return sortAsc(curr.peso[curr.peso.length - 1], next.peso[next.peso.length - 1]);
  })
}

let sortAsc = function(current, next) {
  if (current > next) return 1;
  if (current < next) return -1;
  return 0;
}

let sortDesc = function(current, next) {
  if (current > next) return -1;
  if (current < next) return 1;
  return 0;
}

let filterBreeds = function(filter, temperaments) {

  if (temperaments && filter !== FILTER_CONSTANTS.FILTER_ONLY_TEMP)
    filter = filter === FILTER_CONSTANTS.FILTER_ONLY_DB ? FILTER_CONSTANTS.FILTER_ONLY_DB_TEMP : FILTER_CONSTANTS.FILTER_ONLY_API_TEMP;

  switch(filter) {

    case FILTER_CONSTANTS.FILTER_ONLY_API:
      return breed => !isNaN(breed.id);
    case FILTER_CONSTANTS.FILTER_ONLY_DB:
      return breed => isNaN(breed.id);
    case FILTER_CONSTANTS.FILTER_ONLY_API_TEMP:
      return breed => !isNaN(breed.id) && filterByTemperaments(breed, temperaments);
    case FILTER_CONSTANTS.FILTER_ONLY_DB_TEMP:
      return breed => isNaN(breed.id) && filterByTemperaments(breed, temperaments);
    default:
      return breed => filterByTemperaments(breed, temperaments)
  }
}

let filterByTemperaments = function(breed, temperaments) {

  let breedTemp = breed.temperamento ? breed.temperamento.toUpperCase().split(', ') : null;
  if (!breedTemp) return false;

  let cantTemp = temperaments.length;

  for (var i = 0; i < cantTemp; i++) {
    if (temperaments[i].length === 0) continue;
    if (!breedTemp.some(t => t === temperaments[i])) return false;
  }

  return true;
}