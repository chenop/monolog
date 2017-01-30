import * as actions from './actionTypes';

export const addLogEntry = (logLevel, message) => ({type: actions.ADD_LOG_ENTRY, payload:{logLevel, message}})
export const flushLogEntries = (entries) => ({type: actions.FLUSH_LOG_ENTRIES, payload:{entries}})
export const resetLogEntries = (logLevel) => ({type: actions.RESET_LOG_ENTRIES, payload: logLevel})
