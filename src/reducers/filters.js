import * as actions from '../actions/actionTypes';
import {initialState} from '../config';

export function machine(state = initialState.machine , action) {
  switch (action.type) {

    case actions.CHANGE_FILTER_MACHINE:
      if (action.payload.customMachine) {
        return action.payload.customMachine;
      }
      return action.payload.machineId;

    default:
    return state;
  }
}

export function logLevel(state = initialState.logLevel, action) {
  switch (action.type) {
    case actions.ADD_FILTER_LOGLEVEL:
      return [
        ...state,
        action.payload
      ];

    case actions.REMOVE_FILTER_LOGLEVEL:
      return state.filter((level) => level !== action.payload);

    case actions.CHANGE_FILTER_LOGLEVEL:
      return action.payload

    default:
    return state;
  }
}

export function addLogLevel(state = initialState.logLevel, action) {
  switch (action.type) {

    case actions.ADD_LOGLEVEL:
      return [
        ...state,
        action.payload
      ]

    default:
    return state;
  }
}

export function removeLogLevel(state = initialState.logLevel, action) {
  switch (action.type) {

    case actions.REMOVE_LOGLEVEL:
      return state.filter((level) => level !== action.payload);

    default:
    return state;
  }
}

export function filter(state = initialState.filter, action) {
  switch (action.type) {

    case actions.CHANGE_FILTER_FILTEREXP:
      return action.payload

    default:
    return state;
  }
}
