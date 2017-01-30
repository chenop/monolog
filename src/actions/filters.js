import * as actions from './actionTypes';

export const changeMachine = (machineId, customMachine) => ({type: actions.CHANGE_FILTER_MACHINE, payload: {machineId, customMachine}})
export const changeLoglevel = (logLevel) => ({type: actions.CHANGE_FILTER_LOGLEVEL, payload: logLevel})

export const addLogLevel = (logLevel) => ({type: actions.ADD_FILTER_LOGLEVEL, payload: logLevel})
export const removeLogLevel = (logLevel) => ({type: actions.REMOVE_FILTER_LOGLEVEL, payload: logLevel})

export const changeFilterExpression = (filterExpression) => ({type: actions.CHANGE_FILTER_FILTEREXP, payload: filterExpression})
