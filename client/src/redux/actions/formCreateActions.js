import {  
  SHOW_FORM_CREATE_NEW_DOG,
  VALIDATE_PROPERTY_DOG,
  VALIDATING,
  CHECK_IF_NAME_IS_AVALAIBLE,
  CHANGE_FORM_CREATE_SECTION,
  SET_BACK_PAGE_ANIMATION,
  SET_NEXT_PAGE_ANIMATION,
  CHANGE_TEMPERAMENTS_OF_NEW_DOG,
  SHOW_MODAL_CREATE_TEMPERAMENT,
  CLOSE_MODAL_CREATE_TEMPERAMENT,
  CHANGE_SIZE_OF_NEW_DOG,
  CHANGE_LIFESPAN_OF_NEW_DOG,
  SHOW_MODAL_ADD_IMAGE,
  CLOSE_MODAL_ADD_IMAGE,
  SHOW_MODAL_UPLOAD_IMAGE,
  CLOSE_MODAL_UPLOAD_IMAGE,
  START_UPLOADING_IMAGE,
  ERROR_UPLOADING_IMAGE,
  SUCCESS_UPLOADING_IMAGE,
  CHANGE_IMAGE_OF_NEW_DOG,
  UPLOAD_NEW_DOG,
  CLOSE_MODAL_ON_UPLOAD,
  CLOSE_FORM_CREATE_NEW_DOG,
} from './actions';

const PATH_GET_DOGS_BY_NAME = 'http://localhost:3001/dogs?name=';
const PATH_CREATE_NEW_DOG = 'http://localhost:3001/dogs/create';
const PATH_UPLOAD_TEMPORAY_IMAGE = 'http://localhost:3001/dogs/image/upload';
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
                dispatch({
                  type: UPLOAD_NEW_DOG,
                  payload: {
                    status: false,
                    error: true,
                  }
              });
            }
            else
              dispatch({
                type: CHECK_IF_NAME_IS_AVALAIBLE,
                payload: {
                  breeds: data,
                  name: name
                }
              })
           })
           .catch(error => 
              dispatch({
                type: UPLOAD_NEW_DOG,
                payload: {
                  status: false,
                  error: true
                }
            })
          );
  }
}

export const showFormCreateNewDog = function() {
  return {
    type: SHOW_FORM_CREATE_NEW_DOG,
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

export const changeLifespanOfNewDog = function(lifespan) {
  return {
    type: CHANGE_LIFESPAN_OF_NEW_DOG,
    payload: lifespan
  }
}

export const showModalAddImage = function() {
  return {
    type: SHOW_MODAL_ADD_IMAGE
  }
}

export const closeModalAddImage = function() {
  return {
    type: CLOSE_MODAL_ADD_IMAGE
  }
}

export const showModalUploadImage = function() {
  return {
    type: SHOW_MODAL_UPLOAD_IMAGE
  }
}

export const closeModalUploadImage = function() {
  return {
    type: CLOSE_MODAL_UPLOAD_IMAGE
  }
}

export const startUploadingImage = function() {
  return {
    type: START_UPLOADING_IMAGE
  }
}

export const uploadImage = function(formData) {
  return function(dispatch) {
    return fetch(PATH_UPLOAD_TEMPORAY_IMAGE, {
                  method: 'POST',
                  body: formData
                })
          .then(result => result.json())
          .then(data => {
            if (data.error) dispatch({ type: ERROR_UPLOADING_IMAGE, payload: data.msg });
            else dispatch({ type: SUCCESS_UPLOADING_IMAGE, payload: data.filename });
          })
          .catch(error => {
             dispatch({ type: ERROR_UPLOADING_IMAGE, payload: 'Error en el Servidor' });
          });
  }
}

export const changeImageOfNewDog = function(img) {
  return {
    type: CHANGE_IMAGE_OF_NEW_DOG,
    payload: img
  }
}

export const uploadNewDog = function(data) {
  return function(dispatch) {
    return fetch(PATH_CREATE_NEW_DOG, {
              method: 'POST',
              credentials: 'same-origin',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ data: data })
            })
           .then(result => result.json())
           .then(data => {
            if (data.error) {
              dispatch({
                type: UPLOAD_NEW_DOG,
                payload: {
                  status: false
                }
              })
            }
            else
              dispatch({
                type: UPLOAD_NEW_DOG,
                payload: {
                  status: true
                }
              })
           })
          .catch(error => 
              dispatch({
                type: UPLOAD_NEW_DOG,
                payload: {
                  status: false,
                  error: true
                }
            })
          );
  }
}

export const closeModalOnUpload = function() {
  return {
    type: CLOSE_MODAL_ON_UPLOAD
  }
}

export const closeFormCreateNewDog = function() {
  return {
    type: CLOSE_FORM_CREATE_NEW_DOG
  }
}