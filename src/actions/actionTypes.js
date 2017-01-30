export const ADD_LOG_ENTRY = 'monolog/log/addLogEntry';
export const FLUSH_LOG_ENTRIES = 'monolog/log/flushLogEntries';
export const INCREMENT_COUNTER = 'monolog/counters/incrementCounter';
export const RESET_LOG_ENTRIES = 'monolog/counters/resetLogEntries';

export const CHANGE_FILTER_MACHINE = 'monolog/filters/changeMachine';
export const CHANGE_FILTER_LOGLEVEL = 'monolog/filters/changeLoglevel';
export const ADD_FILTER_LOGLEVEL = 'monolog/filters/addLoglevel';
export const REMOVE_FILTER_LOGLEVEL = 'monolog/filters/removeLoglevel';

export const CHANGE_FILTER_FILTEREXP = 'monolog/filters/changeFilterExpression';

export const ADD_CUSTOM_FILTER_RULE = 'monolog/customfilterRules/addCustomFilterRule';
export const REMOVE_CUSTOM_FILTER_RULE = 'monolog/customfilterRules/removeCustomFilterRule';
export const TOGGLE_CUSTOM_FILTER_RULE = 'monolog/customfilterRules/toggleCustomFilterRule';
export const INVERT_CUSTOM_FILTER_RULE = 'monolog/customfilterRules/invertCustomFilterRule';


export const CHANGE_SETTINGS_BUFFERSIZE = 'monolog/settings/changeBufferSize';
export const TOGGLE_MORE_SETTINGS = 'monolog/settings/toggle';
export const TOGGLE_HIDE_KNOWN = 'monolog/settings/toggleHideKnown';
export const CHANGE_MONITORSTATE = 'monolog/settings/changeMonitorState';


export const LOGIN = 'monolog/login';
export const RELOGIN = 'monolog/login/retry';
export const LOADING = 'monolog/login/loading';
export const READY = 'monolog/login/ready';
export const ERROR = 'monolog/login/error';
