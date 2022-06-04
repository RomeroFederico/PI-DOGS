import {  
  INITIALIZE_NEW_DOG,
  VALIDATE_PROPERTY_DOG,
  VALIDATING,
  CHECK_IF_NAME_IS_AVALAIBLE,
  CHANGE_FORM_CREATE_SECTION,
  SET_BACK_PAGE_ANIMATION,
  SET_NEXT_PAGE_ANIMATION,
  CHANGE_TEMPERAMENTS_OF_NEW_DOG,
  SHOW_MODAL_CREATE_TEMPERAMENT,
  CLOSE_MODAL_CREATE_TEMPERAMENT,
  CHANGE_SIZE_OF_NEW_DOG
} from './actions';

const PATH_GET_DOGS_BY_NAME = 'http://localhost:3001/dogs?name=';
const ERROR_BREED_NOT_FOUND = "Breed not found";

export const checkIfNameIsAvalaible = function(name) {
  return function(dispatch) {
    return fetch(`${PATH_GET_DOGS_BY_NAME}${name}`)
           .then(result => result.json())
           .then(data => {
            if (data.error) {
              if (data.msg === ERROR_BREED_NOT_FOUND) 
                dispatch({
                  type: CHECK_IF_NAME_IS_AVALAIBLE,
                  payload: {
                    valid: true,
                    name: name
                  }
                });
              else
                throw new Error("SERVER ERROR");
            }
            else
              dispatch({
                type: CHECK_IF_NAME_IS_AVALAIBLE,
                payload: {
                  breeds: data,
                  name: name
                }
              })
           });
  }
}

export const initializeNewDog = function() {
  return {
    type: INITIALIZE_NEW_DOG,
  }
}

export const startValidating = function() {
  return {
    type: VALIDATING
  }
}

export const validatePropertyDog = function(property) {
  return {
    type: VALIDATE_PROPERTY_DOG,
    payload: property,
  }
}

export const changeFormCreateSection = function(section, delay) {
  return function (dispatch) {
    return new Promise((resolve) => setTimeout(resolve, delay))
               .then(() => {
                  dispatch({
                    type: CHANGE_FORM_CREATE_SECTION,
                    payload: section
                  })
               })
  }
}

export const setBackPageAnimation = function() {
  return {
    type: SET_BACK_PAGE_ANIMATION
  }
}

export const setNextPageAnimation = function() {
  return {
    type: SET_NEXT_PAGE_ANIMATION
  }
}

export const changeTemperamentsOfNewDog = function(temperaments, temperamentsName) {
  return {
    type: CHANGE_TEMPERAMENTS_OF_NEW_DOG,
    payload: {
      temperaments: temperaments,
      temperamentsName: temperamentsName,
    }
  }
}

export const showModalCreateTemperament = function() {
  return {
    type: SHOW_MODAL_CREATE_TEMPERAMENT
  }
}

export const closeModalCreateTemperament = function() {
  return {
    type: CLOSE_MODAL_CREATE_TEMPERAMENT
  }
}

export const changeSizeOfNewDog = function(height, weight) {
  return {
    type: CHANGE_SIZE_OF_NEW_DOG,
    payload: {
      height,
      weight
    }
  }
}