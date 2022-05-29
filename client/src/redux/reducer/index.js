import { 
  GET_ALL_BREEDS,
  GET_BREED_DETAILS,
  GET_BREEDS_WITH_PAGINATE,
  GET_TEMPERAMENTS,
  RESET_BREEDS,
  SHOW_HOME,
  RESET_HOME,
  SHOW_LOADING,
  CHANGE_THEME
} from '../actions/actions';

const initialState = {

  loading: false,
  theme: 'ligthTheme',

  home: {
    show: false,
    temperaments: [],
    breeds: [],
    pages: 0,
    currentPage: 1,
    filter: {
      sort: 'nombre',
      order: 'asc',
      filter: '',
      temperaments: []
    }
  }
}

const rootReducer = (state = initialState, {type, payload}) => {
  switch(type) {
    case GET_BREEDS_WITH_PAGINATE:
      return {
        ...state,
        loading: false,
        home: {
          ...state.home,
          ...payload,
          filter: {
            ...payload.filter,
            temperaments: 
              Array.isArray(payload.filter.temperaments) ? 
              payload.filter.temperaments : payload.filter.temperaments.split('-')
          }
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
    case RESET_BREEDS:
      return {
        ...state,
        currentPage: 1,
        pages: 0,
        loading: true,
        home: {
          ...state.home,
          breeds: []
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
    case CHANGE_THEME:
      return {
        ...state,
        theme: state.theme === 'ligthTheme' ? 'darkTheme' : 'ligthTheme'
      }
    default:
      return state;
  }
}

export default rootReducer;