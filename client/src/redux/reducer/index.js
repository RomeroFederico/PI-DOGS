import { TEST } from '../actions/actions';

const initialState = {
  test: false
}

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case TEST:
      return {
        ...state,
        test: true
      }
    default:
      return state;
  }
}

export default rootReducer;