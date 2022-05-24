import { 
  GET_ALL_BREEDS,
  GET_BREED_DETAILS
} from './actions';

const PATH_GET_DOGS = 'http://localhost:3001/dogs';

export function getAllBreeds () {
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