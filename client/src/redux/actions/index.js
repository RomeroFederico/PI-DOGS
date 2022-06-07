import { 
  SHOW_HOME,
  RESET_HOME,
  SHOW_LOADING,
  CHANGE_THEME
} from './actions';

export const showHome = function() {
  return {
    type: SHOW_HOME
  }
}

export const resetHome = function() {
  return {
    type: RESET_HOME
  }
}

export const showLoading = function() {
  return {
    type: SHOW_LOADING
  }
}

export const changeTheme = function() {
  return {
    type: CHANGE_THEME
  }
}

export * from './homeActions';
export * from './formCreateActions';
export * from './breedDetailsActions';