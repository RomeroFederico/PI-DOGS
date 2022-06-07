import {
  GET_BREED_DETAILS,
  CLOSE_BREED_DETAILS
} from './actions';

const PATH_GET_BREED_DETAILS = 'http://localhost:3001/dogs';

export const getBreedDetails = function(breedId) {
  return function(dispatch) {
    return fetch(`${PATH_GET_BREED_DETAILS}/${breedId}`)
           .then(result => result.json())
           .then(breedDetails => {
             dispatch({
              type: GET_BREED_DETAILS,
              payload: breedDetails
             })
           })
  }
}

export const closeBreedDetails = function() {
  return {
    type: CLOSE_BREED_DETAILS
  }
}