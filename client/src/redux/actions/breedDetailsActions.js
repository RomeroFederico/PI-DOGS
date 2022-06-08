import {
  GET_BREED_DETAILS,
  CLOSE_BREED_DETAILS,
  DISPLAY_ERROR_MESSAGE,
  CLOSE_ERROR_MESSAGE
} from './actions';

const PATH_GET_BREED_DETAILS = 'http://localhost:3001/dogs';

export const getBreedDetails = function(breedId) {
  return function(dispatch) {
    return fetch(`${PATH_GET_BREED_DETAILS}/${breedId}`)
           .then(result => result.json())
           .then(breedDetails => {
             if (breedDetails.error)
                dispatch({
                  type: DISPLAY_ERROR_MESSAGE,
                  payload: {
                    msg: 'No se encontro un ID asociada a la raza.',
                    type: 'NOTFOUND'
                  }
                })
             else
               dispatch({
                type: GET_BREED_DETAILS,
                payload: breedDetails
               })
           })
           .catch(error => {
              dispatch({
                type: DISPLAY_ERROR_MESSAGE,
                payload: {
                  msg: 'Error en el servidor. Vuelva a intentarlo mas tarde.',
                  type: 'SERVER'
                }
              })
           })
  }
}

export const closeBreedDetails = function() {
  return {
    type: CLOSE_BREED_DETAILS
  }
}

export const closeErrorMessage = function() {
  return {
    type: CLOSE_ERROR_MESSAGE
  }
}