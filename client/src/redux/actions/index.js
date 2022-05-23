import { TEST } from './actions';

export function testReducer() {
  return {
    type: TEST
  }
}

export function testWithDelay () {
  return function(dispatch) {
    return new Promise(resolve => setTimeout(resolve, 3000))
      .then(value => {
        dispatch({
          type: TEST
        })
      })
  }
}