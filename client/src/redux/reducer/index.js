import { GET_ALL_BREEDS, GET_BREED_DETAILS } from '../actions/actions';

const initialState = {
  breeds: [],
  breedDetails: {}
}

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_ALL_BREEDS:
      return {
        ...state,
        breeds: action.payload
      }
    default:
      return state;
  }
}

export default rootReducer;