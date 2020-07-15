import { createStore } from 'redux';
import { wrapStore } from 'webext-redux';

/*
 * Reducer
 */

const initialState = {
  count: 23,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1,
      };
    default:
      return state;
  }
}

/*
 * Store
 */

const store = createStore(reducer);

// Wrap the store with webext-redux
wrapStore(store);
