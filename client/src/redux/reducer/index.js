import { 
  GET_ALL_BREEDS,
  GET_BREED_DETAILS,
  GET_BREEDS_WITH_PAGINATE,
  GET_TEMPERAMENTS,
  SHOW_HOME,
  RESET_HOME,
  SHOW_LOADING
} from '../actions/actions';

const initialState = {

  loading: false,

  home: {
    show: false,
    temperaments: [],
    breeds: [],
    pages: 0,
    currentPage: 1
  }
}

const rootReducer = (state = initialState, {type, payload}) => {
  switch(type) {
    case GET_BREEDS_WITH_PAGINATE:
      return {
        ...state,
        home: {
          ...state.home,
          ...payload
        }
      }
    case GET_TEMPERAMENTS:
      return {
        ...state,
        home: {
          ...state.home,
          temperaments: payload
        }
      }
    case SHOW_HOME:
      return {
        ...state,
        home: {
          ...state.home,
          show: true
        }
      }
    case RESET_HOME:
      return {
        ...state,
        home: {
          show: false,
          temperaments: [],
          breeds: [],
          pages: 0
        }
      }
    default:
      return state;
  }
}

export default rootReducer;