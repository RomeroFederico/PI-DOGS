import { 
  GET_ALL_BREEDS,
  GET_BREED_DETAILS,
  GET_BREEDS_WITH_PAGINATE,
  GET_BREEDS_BY_NAME,
  GET_TEMPERAMENTS,
  GET_BREEDS_WITH_PAGINATE_LOCAL,
  BREEDS_NOT_FOUND,
  RESET_BREEDS,
  SET_FILTER_DATA,
  SET_PAGE,
  SHOW_MODAL_TEMPERAMENTS,
  CLOSE_MODAL_TEMPERAMENTS,
  SEARCH_TEMPERAMENTS_MODAL,
  ADD_TEMPERAMENT_TO_FILTERS,
  REMOVE_TEMPERAMENT_FROM_FILTERS,
  INITIALIZE_NEW_DOG,
  VALIDATE_PROPERTY_DOG,
  VALIDATING,
  CHECK_IF_NAME_IS_AVALAIBLE,
  CHANGE_FORM_CREATE_SECTION,
  SHOW_HOME,
  RESET_HOME,
  SHOW_LOADING,
  CHANGE_THEME
} from '../actions/actions';

import { filterLocalBreeds } from '../../util/filtrados';
import { Dog } from '../../util/validaciones';
import { checkIfExistBreedByName } from '../../util';

const initialState = {

  loading: false,
  theme: 'darkTheme',

  home: {
    show: false,
    allTemperaments: [],
    breeds: [],
    localBreeds: null,
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
  },

  create: {
    validating: false,
    section: 1,
    newDog: null,
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
          localBreeds: null,
          filterData: {
            ...payload.filterData,
          }
        }
      }
    case GET_BREEDS_BY_NAME:

      var { breeds, pages } = filterLocalBreeds([ ...payload.localBreeds ], { ...payload.filterData });

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
    case GET_BREEDS_WITH_PAGINATE_LOCAL: 

      var { breeds, pages } = filterLocalBreeds([ ...state.home.localBreeds ], { ...payload.filterData }, payload.currentPage);

      return {
        ...state,
        loading: false,
        home: {
          ...state.home,
          breeds: breeds,
          pages: pages,
          currentPage: payload.currentPage,
          filterData: {
            ...payload.filterData
          }
        }
      }
    case BREEDS_NOT_FOUND:
      return {
        ...state,
        loading: false,
        home: {
          ...state.home,
          pages: 1,
          currentPage: 1,
          breeds: [],
          localBreeds: payload.localBreeds, // Si viene de getBreedsByName, vendra como un [], caso contrario => null/undefined
          filterData: payload.filterData
        }
      }
    case SET_PAGE:
      return {
        ...state,
        home: {
          ...state.home,
          currentPage: payload
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
    case INITIALIZE_NEW_DOG:
      return {
        ...state,
        create: {
          ...state.create,
          newDog: new Dog('', [], [])
        }
      }
    case VALIDATE_PROPERTY_DOG:
      return {
        ...state,
        create: {
          ...state.create,
          newDog: {
            ...state.create.newDog,
            [payload]: true
          }
        }
      }
    case VALIDATING:
      return {
        ...state,
        create: {
          ...state.create,
          validating: true
        }
      }
    case CHECK_IF_NAME_IS_AVALAIBLE:

      let resultValidateName = payload.valid ? true : checkIfExistBreedByName(payload.breeds, payload.name)

      return {
        ...state,
        create: {
          ...state.create,
          validating: false,
          newDog: {
            ...state.create.newDog,
            validName: resultValidateName,
            name: payload.name
          }
        }
      }
    case CHANGE_FORM_CREATE_SECTION:
      return {
        ...state,
        create: {
          ...state.create,
          section: payload
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