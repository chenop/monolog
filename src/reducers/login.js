import * as actions from '../actions/actionTypes';
import {initialState} from '../config';

export function login(state = initialState.credentials, action) {
  switch (action.type) {

    case actions.LOGIN:
      return {
        ...state,
        ...action.payload,
        loading: true
      }

    case actions.ERROR:
      return {
        ...state,
        error: state.error && typeof state.error === 'string' && (state.error.match(/<br\/>/g) || []).length < 3
          ? `${state.error}<br/>${action.payload}`
          : action.payload,
        loading: false
      }
    case actions.LOADING:
      return {
        ...state,
        error: null,
        loading: true
      }
    case actions.READY:
      return {
        ...state,
        error: null,
        loading: false
      }
    case actions.RELOGIN:
      return {
        error: null,
        loading: false
      }

    default:
    return state;
  }
}
