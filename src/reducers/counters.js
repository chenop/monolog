import * as actions from '../actions/actionTypes';

export function counters(state = {}, action) {
  switch (action.type) {

    case actions.INCREMENT_COUNTER:
      return Object.assign({}, state, {
          ...state,
          [action.payload]: state[action.payload] + 1
        });

    default:
    return state;
  }
}
