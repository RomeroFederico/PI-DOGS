import { 
  GET_ALL_BREEDS,
  GET_BREED_DETAILS,
  GET_BREEDS_WITH_PAGINATE,
  GET_BREEDS_BY_NAME,
  GET_TEMPERAMENTS,
  RESET_BREEDS,
  SET_FILTER_DATA,
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

import { filterLocalBreeds } from '../../util/filtrados';

const initialState = {

  loading: false,
  theme: 'darkTheme',

  home: {
    show: false,
    allTemperaments: [],
    breeds: [],
    localBreeds: [],
    pages: 0,
    currentPage: 1,
    filterData: {
      sort: 'nombre',
      order: 'asc',
      filter: '',
      temperaments: '',
    },
    modalAddTemperaments: {
      show: false,
      search: '',
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
          filterData: {
            ...payload.filterData,
          }
        }
      }
    case GET_BREEDS_BY_NAME:

      let { breeds, pages } = filterLocalBreeds([ ...payload.localBreeds ], { ...payload.filterData });

      console.log(breeds, pages);
      console.log('payload:', payload);

      return {
        ...state,
        loading: false,
        home: {
          ...state.home,
          ...payload,
          breeds: breeds,
          pages: pages,
          filterData: {
            ...payload.filterData,
          }
        }
      }
    case GET_TEMPERAMENTS:
      return {
        ...state,
        home: {
          ...state.home,
          allTemperaments: payload
        }
      }
    case SET_FILTER_DATA:
      return {
        ...state,
        home: {
          ...state.home,
          filterData: payload,
        }
      }
    case SHOW_MODAL_TEMPERAMENTS:
      return {
        ...state,
        home: {
          ...state.home,
          modalAddTemperaments: {
            show: true,
            search: ''
          }
        }
      }
    case CLOSE_MODAL_TEMPERAMENTS:
      return {
        ...state,
        home: {
          ...state.home,
          modalAddTemperaments: {
            show: false,
            search: ''
          }
        }
      }
    case SEARCH_TEMPERAMENTS_MODAL:
      return {
        ...state,
        home: {
          ...state.home,
          modalAddTemperaments: {
            show: true,
            search: payload
          }
        }
      }
    case ADD_TEMPERAMENT_TO_FILTERS:
      return {
        ...state,
        home: {
          ...state.home,
          filterData: {
            ...state.home.filterData,
            temperaments: payload,
          },
          modalAddTemperaments: {
            show: false,
            search: ''
          }
        }
      }
    case REMOVE_TEMPERAMENT_FROM_FILTERS:
      return {
        ...state,
        home: {
          ...state.home,
          filterData: {
            ...state.home.filterData,
            temperaments: payload
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