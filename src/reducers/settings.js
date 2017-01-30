import * as actions from '../actions/actionTypes';
import {initialState} from '../config';

export function bufferSize(state = initialState.bufferSize, action) {
  switch (action.type) {

    case actions.CHANGE_SETTINGS_BUFFERSIZE:
      return action.payload

    default:
    return state;
  }
}

export function moreSettingsModalVisible(state = initialState.moreSettingsModalVisible, action) {
  switch (action.type) {

    case actions.TOGGLE_MORE_SETTINGS:
      return !state

    default:
    return state;
  }
}

export function monitorState(state = initialState.monitorState, action) {
  switch (action.type) {

    case actions.CHANGE_MONITORSTATE:
      return state > 0 ? 0 : 1

    default:
    return state;
  }
}

export function hideKnown(state = initialState.hideKnown, action) {
  switch (action.type) {

    case actions.TOGGLE_HIDE_KNOWN:
      return !state;

    default:
    return state;
  }
}

export function filters(state = initialState.filters, action) {
  switch (action.type) {

    case actions.ADD_CUSTOM_FILTER_RULE:
      return [
        ...state,
        {expression: action.payload, active: true}
      ];

    case actions.REMOVE_CUSTOM_FILTER_RULE:
      return state.filter((filter, i) => {
        return i !== action.payload;
      });

    case actions.INVERT_CUSTOM_FILTER_RULE:
      return state.map((filter, i) => {
      if (i === action.payload) {
        filter.not = !filter.not;
      }
      return filter;
    })

    case actions.TOGGLE_CUSTOM_FILTER_RULE:
      return state.map((filter, i) => {
          if (i === action.payload) {
            filter.active = !filter.active;
          }
          return filter;
        });

    default:
    return state;
  }
}
