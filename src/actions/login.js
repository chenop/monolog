import * as actions from './actionTypes';

export const login = (credentials) => ({type: actions.LOGIN, payload:credentials})
export const reLogin = () => ({type: actions.RELOGIN})
export const error = (errorData) => ({type: actions.ERROR, payload:errorData})
export const loading = () => ({type: actions.LOADING})
export const ready = () => ({type: actions.READY})
