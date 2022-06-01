import { 
  GET_ALL_BREEDS,
  GET_BREED_DETAILS,
  GET_BREEDS_WITH_PAGINATE,
  GET_BREEDS_BY_NAME,
  GET_TEMPERAMENTS,
  GET_BREEDS_WITH_PAGINATE_LOCAL,
  BREEDS_NOT_FOUND,
  RESET_BREEDS,
  SET_FILTER_DATA,
  SET_PAGE,
  SHOW_MODAL_TEMPERAMENTS,
  CLOSE_MODAL_TEMPERAMENTS,
  SEARCH_TEMPERAMENTS_MODAL,
  ADD_TEMPERAMENT_TO_FILTERS,
  REMOVE_TEMPERAMENT_FROM_FILTERS,
  INITIALIZE_NEW_DOG,
  VALIDATE_PROPERTY_DOG,
  SHOW_HOME,
  RESET_HOME,
  SHOW_LOADING,
  CHANGE_THEME
} from './actions';

const PATH_GET_DOGS = 'http://localhost:3001/dogs';
const PATH_GET_DOGS_BY_NAME = 'http://localhost:3001/dogs?name=';
const PATH_GET_TEMPERAMENTS = 'http://localhost:3001/temperament';
const PATH_GET_DOGS_PAGE = 'http://localhost:3001/dogs/page';

const ERROR_BREED_NOT_FOUND = "Breed not found";

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
    sort: 'nombre',
    order: 'ascending',
    filter: '',
    temperaments: '',
  }) {

  let query = Object.keys(filterOptions)
              .map(k => `${k}=${filterOptions[k] ? filterOptions[k] : ''}`)
              .join('&');

  return function(dispatch) {
    return fetch(`${PATH_GET_DOGS_PAGE}/${page}?${query}`)
           .then(result => result.json())
           .then(data => {
              if (data.error) {
                if (data.msg === ERROR_BREED_NOT_FOUND) 
                  dispatch({
                    type: BREEDS_NOT_FOUND,
                    payload: {
                      filterData: { ...filterOptions }
                    }
                  });
                else
                  throw new Error("SERVER ERROR");
              }
              else 
                dispatch({
                  type: GET_BREEDS_WITH_PAGINATE,
                  payload: {
                    breeds: data.breeds,
                    pages: data.pages,
                    currentPage: page,
                    localBreeds: [],
                    filterData: { ...filterOptions }
                }
              })
           })
  }
}

export const getBreedsByName = function(name, filterOptions) {
  return function(dispatch) {
    return fetch(`${PATH_GET_DOGS_BY_NAME}${name}`)
           .then(result => result.json())
           .then(data => {
              if (data.error) {
                if (data.msg === ERROR_BREED_NOT_FOUND) 
                  dispatch({
                    type: BREEDS_NOT_FOUND,
                    payload: {
                      localBreeds: [],
                      filterData: { ...filterOptions }
                    }
                  });
                else
                  throw new Error("SERVER ERROR");
              }
              else
              dispatch({
                type: GET_BREEDS_BY_NAME,
                payload: {
                  localBreeds: data,
                  currentPage: 1,
                  filterData: { ...filterOptions }
                }
              })
           })
  }
}

export const getBreedsWithPaginateLocal = function(page, filterOptions) {
  return function (dispatch) {
    return new Promise((resolve) => setTimeout(resolve, 500))
               .then(() => {
                  dispatch({
                    type: GET_BREEDS_WITH_PAGINATE_LOCAL,
                    payload: {
                      currentPage: page,
                      filterData: { ...filterOptions }
                    }
                  })
               })
  }
}

export const resetBreeds = function() {
  return {
    type: RESET_BREEDS
  }
}

export const setFilterData = function(filterData) {
  return {
    type: SET_FILTER_DATA,
    payload: filterData
  }
}

export const setPage = function(page) {
  return {
    type: SET_PAGE,
    payload: page
  }
}

export const closeModalTemperaments = function() {
  return {
    type: CLOSE_MODAL_TEMPERAMENTS
  }
}

export const showModalTemperaments = function() {
  return {
    type: SHOW_MODAL_TEMPERAMENTS
  }
}

export const searchTemperamentsModal = function(value) {
  return {
    type: SEARCH_TEMPERAMENTS_MODAL,
    payload: value
  }
}

export const addTemperamentToFilters = function(value) {
  return {
    type: ADD_TEMPERAMENT_TO_FILTERS,
    payload: value
  }
}

export const removeTemperamentFromFilters = function(value) {
  return {
    type: REMOVE_TEMPERAMENT_FROM_FILTERS,
    payload: value
  }
}

export const initializeNewDog = function() {
  return {
    type: INITIALIZE_NEW_DOG,
  }
}

export const validatePropertyDog = function(property) {
  return {
    type: VALIDATE_PROPERTY_DOG,
    payload: property,
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

export const changeTheme = function() {
  return {
    type: CHANGE_THEME
  }
}