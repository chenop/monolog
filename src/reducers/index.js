import {combineReducers} from 'redux';
import {entries} from './entries';
import {counters} from './counters';
import {login} from './login';
import {machine, logLevel, filter} from './filters';
import {bufferSize, moreSettingsModalVisible, monitorState, filters, hideKnown} from './settings';

const rootReducer = combineReducers({
  logEntries: entries,
  counters,
  machine,
  logLevel,
  filter,
  bufferSize,
  moreSettingsModalVisible,
  monitorState,
  filters,
  hideKnown,
  credentials: login
});

export default rootReducer;
