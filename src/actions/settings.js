import * as actions from './actionTypes';

export const changeBufferSize = (size) => ({type: actions.CHANGE_SETTINGS_BUFFERSIZE, payload: size})
export const changeMonitorState = (state) => ({type: actions.CHANGE_MONITORSTATE, payload: state})
export const toggleMoreSettings = () => ({type: actions.TOGGLE_MORE_SETTINGS})
export const toggleHideKnown = () => ({type: actions.TOGGLE_HIDE_KNOWN})

export const addCustomFilterRule = (rule) => ({type: actions.ADD_CUSTOM_FILTER_RULE, payload: rule})
export const removeCustomFilterRule = (index) => ({type: actions.REMOVE_CUSTOM_FILTER_RULE, payload: index})
export const toggleCustomFilterRule = (index) => ({type: actions.TOGGLE_CUSTOM_FILTER_RULE, payload: index})
export const invertCustomFilterRule = (index) => ({type: actions.INVERT_CUSTOM_FILTER_RULE, payload: index})
