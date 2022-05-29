import { 
  GET_ALL_BREEDS,
  GET_BREED_DETAILS,
  GET_BREEDS_WITH_PAGINATE,
  GET_TEMPERAMENTS,
  RESET_BREEDS,
  SHOW_MODAL_TEMPERAMENTS,
  CLOSE_MODAL_TEMPERAMENTS,
  SEARCH_TEMPERAMENTS_MODAL,
  ADD_TEMPERAMENT_TO_FILTERS,
  REMOVE_TEMPERAMENT_FROM_FILTERS,
  SHOW_HOME,
  RESET_HOME,
  SHOW_LOADING,
  CHANGE_THEME
} from '../actions/actions';

const initialState = {

  loading: false,
  theme: 'darkTheme',

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
      temperaments: [],
      modal: {
        show: false,
        search: '',
      }
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
            ...state.home.filter,
            ...payload.filter,
            temperaments: 
              Array.isArray(payload.filter.temperaments) ? 
              payload.filter.temperaments : payload.filter.temperaments.split(',')
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
    case SHOW_MODAL_TEMPERAMENTS:
      return {
        ...state,
        home: {
          ...state.home,
          filter: {
            ...state.home.filter,
            modal: {
              show: true,
              search: ''
            }
          }
        }
      }
    case CLOSE_MODAL_TEMPERAMENTS:
      return {
        ...state,
        home: {
          ...state.home,
          filter: {
            ...state.home.filter,
            modal: {
              show: false,
              search: ''
            }
          }
        }
      }
    case SEARCH_TEMPERAMENTS_MODAL:
      return {
        ...state,
        home: {
          ...state.home,
          filter: {
            ...state.home.filter,
            modal: {
              ...state.home.filter.modal,
              search: payload
            }
          }
        }
      }
    case ADD_TEMPERAMENT_TO_FILTERS: {

      let newTemperaments = state.home.filter.temperaments[0] !== '' ? 
        state.home.filter.temperaments.concat([payload]) :
        [payload];

      return {
        ...state,
        home: {
          ...state.home,
          filter: {
            ...state.home.filter,
            temperaments: newTemperaments,
            modal: {
              show: false,
              search: ''
            }
          }
        }
      }
    }
    case REMOVE_TEMPERAMENT_FROM_FILTERS: {
      return {
        ...state,
        home: {
          ...state.home,
          filter: {
            ...state.home.filter,
            temperaments: state.home.filter.temperaments.filter(t => t !== payload)
          }
        }
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
        home: { ...initialState.home }
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