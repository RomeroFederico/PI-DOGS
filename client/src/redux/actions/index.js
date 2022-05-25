import { 
  GET_ALL_BREEDS,
  GET_BREED_DETAILS,
  GET_BREEDS_WITH_PAGINATE,
  GET_TEMPERAMENTS,
  SHOW_HOME,
  RESET_HOME,
  SHOW_LOADING
} from './actions';

const PATH_GET_DOGS = 'http://localhost:3001/dogs';
const PATH_GET_TEMPERAMENTS = 'http://localhost:3001/temperament';
const PATH_GET_DOGS_PAGE = 'http://localhost:3001/dogs/page';

export const getAllBreeds = function() {
  return function(dispatch) {
    return fetch(PATH_GET_DOGS)
           .then(result => result.json())
           .then(breeds => {
             dispatch({
              type: GET_ALL_BREEDS,
              payload: breeds 
             })
           })
  }
}

export const getTemperaments = function() {
  return function(dispatch) {
    return fetch(PATH_GET_TEMPERAMENTS)
           .then(result => result.json())
           .then(temperaments => {
             dispatch({
              type: GET_TEMPERAMENTS,
              payload: temperaments 
             })
           })
  }
}

export const getBreedsWithPaginate = function(page = 1, filterOptions = {
    sort: 'peso',
    order: 'descending',
    filter: null,
    temperaments: 'playful'
  }) {

  let query = Object.keys(filterOptions)
              .map(k => `${k}=${filterOptions[k] ? filterOptions[k] : ''}`)
              .join('&');

  return function(dispatch) {
    return fetch(`${PATH_GET_DOGS_PAGE}/${page}?${query}`)
           .then(result => result.json())
           .then(data => {
             dispatch({
              type: GET_BREEDS_WITH_PAGINATE,
              payload: {
                breeds: data.breeds,
                pages: data.pages
              }
             })
           })
  }
}

export const showHome = function() {
  return {
    type: SHOW_HOME
  }
}

export const resetHome = function() {
  return {
    type: RESET_HOME
  }
}

export const showLoading = function() {
  return {
    type: SHOW_LOADING
  }
}