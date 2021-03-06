import { 
  GET_ALL_BREEDS,
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

  SHOW_FORM_CREATE_NEW_DOG,
  VALIDATE_PROPERTY_DOG,
  VALIDATING,
  CHECK_IF_NAME_IS_AVALAIBLE,
  CHANGE_FORM_CREATE_SECTION,
  SET_BACK_PAGE_ANIMATION,
  SET_NEXT_PAGE_ANIMATION,
  CHANGE_TEMPERAMENTS_OF_NEW_DOG,
  SHOW_MODAL_CREATE_TEMPERAMENT,
  CLOSE_MODAL_CREATE_TEMPERAMENT,
  CHANGE_SIZE_OF_NEW_DOG,
  CHANGE_LIFESPAN_OF_NEW_DOG,
  SHOW_MODAL_ADD_IMAGE,
  CLOSE_MODAL_ADD_IMAGE,
  SHOW_MODAL_UPLOAD_IMAGE,
  CLOSE_MODAL_UPLOAD_IMAGE,
  START_UPLOADING_IMAGE,
  ERROR_UPLOADING_IMAGE,
  SUCCESS_UPLOADING_IMAGE,
  CHANGE_IMAGE_OF_NEW_DOG,
  UPLOAD_NEW_DOG,
  CLOSE_MODAL_ON_UPLOAD,
  CLOSE_FORM_CREATE_NEW_DOG,

  GET_BREED_DETAILS,
  CLOSE_BREED_DETAILS,

  SHOW_HOME,
  RESET_HOME,
  CHANGE_THEME,
  DISPLAY_ERROR_MESSAGE,
  CLOSE_ERROR_MESSAGE
} from '../actions/actions';

import { filterLocalBreeds } from '../../util/filtrados';
import { Dog } from '../../util/validaciones';
import { checkIfExistBreedByName } from '../../util';

const initialState = {

  loading: false,
  theme: 'ligthTheme',
  allTemperaments: [],

  home: {
    show: false,
    breeds: [],
    localBreeds: null,
    pages: 0,
    currentPage: 1,
    filterData: {
      sort: 'nombre',
      order: 'asc',
      filter: '',
      temperaments: '',
    }
  },

  modalAddTemperaments: {
    show: false,
    search: '',
  },

  create: {
    show: false,
    validating: false,
    section: 1,
    animateBackPage: false,
    animateNextPage: false,
    newTemperaments: [],
    oldTemperaments: [], 
    newDog: null,
  },

  modalCreateTemperament: {
    show: false
  },

  modalAddImage: {
    show: false
  },

  modalUploadImage: {
    show: false,
    error: false,
    errorMsg: '',
  },

  modalOnUpload: {
    show: false,
    status: false
  },

  details: {
    show: false,
    dog: null
  },

  modalError: {
    show: false,
    type: '',
    msg: '',
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
        allTemperaments: payload
      }
    case GET_BREEDS_WITH_PAGINATE_LOCAL: 

      var filterResponse = filterLocalBreeds([ ...state.home.localBreeds ], { ...payload.filterData }, payload.currentPage);

      return {
        ...state,
        loading: false,
        home: {
          ...state.home,
          breeds: filterResponse.breeds,
          pages: filterResponse.pages,
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
        modalAddTemperaments: {
          show: true,
          search: ''
        }
      }
    case CLOSE_MODAL_TEMPERAMENTS:
      return {
        ...state,
        modalAddTemperaments: {
          show: false,
          search: ''
        }
      }
    case SEARCH_TEMPERAMENTS_MODAL:
      return {
        ...state,
        modalAddTemperaments: {
          show: true,
          search: payload
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
          }
        },
        modalAddTemperaments: {
          show: false,
          search: ''
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
        allTemperaments: [],
        home: { ...initialState.home }
      }
    case SHOW_FORM_CREATE_NEW_DOG:
      return {
        ...state,
        allTemperaments: [],
        create: {
          show: true,
          validating: false,
          section: 1,
          animateBackPage: false,
          animateNextPage: false,
          newTemperaments: [],
          oldTemperaments: [],
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

      let resultValidateName = payload.valid ? true : checkIfExistBreedByName(payload.breeds, payload.name);

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
          animateBackPage: false,
          animateNextPage: false,
          section: payload
        }
      }
    case SET_BACK_PAGE_ANIMATION:
      return {
        ...state,
        create: {
          ...state.create,
          animateBackPage: true,
        }
      }
    case SET_NEXT_PAGE_ANIMATION:
      return {
        ...state,
        create: {
          ...state.create,
          animateNextPage: true,
        }
      }
    case CHANGE_TEMPERAMENTS_OF_NEW_DOG:
      return {
        ...state,
        modalAddTemperaments: {
          show: false,
          search: ''
        },
        create: {
          ...state.create,
          [payload.temperamentsName]: payload.temperaments,
        }
      }
    case SHOW_MODAL_CREATE_TEMPERAMENT:
      return {
        ...state,
        modalCreateTemperament: {
          show: true,
        }
      }
    case CLOSE_MODAL_CREATE_TEMPERAMENT:
      return {
        ...state,
        modalCreateTemperament: {
          show: false,
        }
      }
    case CHANGE_SIZE_OF_NEW_DOG:
      return {
        ...state,
        create: {
          ...state.create,
          newDog: {
            ...state.create.newDog,
            weight: {
              min: payload.weight.min,
              max: payload.weight.max,
            },
            height: {
              min: payload.height.min,
              max: payload.height.max,
            },
            validWeighAndHeight: true,
          }
        }
      }
    case CHANGE_LIFESPAN_OF_NEW_DOG:
      return {
        ...state,
        create: {
          ...state.create,
          newDog: {
            ...state.create.newDog,
            lifespan: payload,
            validLifespan: true
          }
        }
      }
    case SHOW_MODAL_ADD_IMAGE:
      return {
        ...state,
        modalAddImage: {
          show: true
        }
      }
    case CLOSE_MODAL_ADD_IMAGE:
      return {
        ...state,
        modalAddImage: {
          show: false
        }
      }
    case SHOW_MODAL_UPLOAD_IMAGE: 
      return {
        ...state,
        modalUploadImage: {
          show: true
        }
      }
    case CLOSE_MODAL_UPLOAD_IMAGE: 
      return {
        ...state,
        modalUploadImage: {
          show: false
        }
      }
    case START_UPLOADING_IMAGE:
      return {
        ...state,
        modalUploadImage: {
          ...state.modalUploadImage,
          error: false,
          errorMsg: '',
        }
      }
    case ERROR_UPLOADING_IMAGE:
      return {
        ...state,
        modalUploadImage: {
          ...state.modalUploadImage,
          error: true,
          errorMsg: payload
        }
      }
    case SUCCESS_UPLOADING_IMAGE:
      return {
        ...state,
        create: {
          ...state.create,
          newDog: {
            ...state.create.newDog,
            image: payload,
          }
        },
        modalUploadImage: {
          show: false,
          error: false,
          errorMsg: ''
        }
      }
    case CHANGE_IMAGE_OF_NEW_DOG:
      return {
        ...state,
        create: {
          ...state.create,
          newDog: {
            ...state.create.newDog,
            image: payload,
          }
        }
      }
    case UPLOAD_NEW_DOG:
      return {
        ...state,
        create: {
          ...state.create,
          validating: false,
        },
        modalOnUpload: {
          show: true,
          status: payload.status,
          error: payload.error,
        }
      }
    case CLOSE_MODAL_ON_UPLOAD:
      return {
        ...state,
        modalOnUpload: {
          show: false,
          status: false,
          error: null
        }
      }
    case CLOSE_FORM_CREATE_NEW_DOG:
      return {
        ...state,
        create: {
          ...state.create,
          show: false,
        }
      }
    case GET_BREED_DETAILS: {
      return {
        ...state,
        details: {
          show: true,
          dog: payload
        }
      }
    }
    case CLOSE_BREED_DETAILS:
      return {
        ...state,
        details: {
          show: false,
          dog: null
        }
      }
    case CHANGE_THEME:
      return {
        ...state,
        theme: state.theme === 'ligthTheme' ? 'darkTheme' : 'ligthTheme'
      }
    case DISPLAY_ERROR_MESSAGE:
      return {
        ...state,
        modalError: {
          show: true,
          msg: payload.msg,
          type: payload.type,
        }
      }
    case CLOSE_ERROR_MESSAGE:
      return {
        ...state,
        modalError: {
          show: false,
          msg: '',
          type: '',
        }
      }
    default:
      return state;
  }
}

export default rootReducer;