import * as actions from '../actions/actionTypes';

export function entries(state = {}, action) {
  switch (action.type) {

    case actions.FLUSH_LOG_ENTRIES:

      let newState = {};
      Object.keys(action.payload.entries).forEach((logLevelType, i, entries) => {
        if (Object.keys(action.payload.entries[logLevelType]).length) newState[logLevelType] = action.payload.entries[logLevelType];
      });

      return Object.assign({}, state, newState);

    case actions.ADD_LOG_ENTRY:
      return Object.assign({}, state, {
          [action.payload.logLevel]: {
            ...state[action.payload.logLevel],
            [action.payload.message.key]: {
              signature: action.payload.message.signature,
              isKnown: action.payload.message.isKnown,
              entryType: action.payload.message.entryType,
            }
          }
        });
    case actions.RESET_LOG_ENTRIES:
      return Object.assign({}, state, {
        [action.payload]: {}
      });

    default:
    return state;
  }
}
