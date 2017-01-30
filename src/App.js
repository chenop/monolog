import React, { Component } from 'react';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import uuidV4 from 'uuid/v4';
import Layout from './components/Layout';
import ErrorMessage from './components/ErrorMessage';
import AppConfig from './config';
import * as logActions from './actions/entries';
import * as countersActions from './actions/counters';
import * as loginActions from './actions/login';
import * as selectors from './selectors';

class App extends Component {

  constructor() {
    super();
    this.init();
  }

  init() {
    //this.socket = io(window.location.host);
    //this.socket = io(`${AppConfig.log.PROTOCOL}://${AppConfig.log.HOST}`);
    this.socket = io(`${AppConfig.log.PROTOCOL}://${AppConfig.log.HOST}:${AppConfig.log.PORT}`);

    this.socket.on('error', console.error.bind(console));
    this.socket.on('message', console.log.bind(console));

    this.addLogEntry = this.addLogEntry.bind(this);
    this.updateLoggerState = this.updateLoggerState.bind(this);
    this.isLogEntryExist = this.isLogEntryExist.bind(this);

  }

  componentDidMount() {
    let byteSteamToStringWorker = require("worker-loader!./Workers/ByteSteamToString.js"); // eslint-disable-line
    let worker = new byteSteamToStringWorker();

    let app = this;
    worker.addEventListener('message', function(e) {
      e.data.forEach((line) => app.addLogEntry(line));
    }, false);

    const sessionId = uuidV4();
    this.socket.emit('login', {
      ...this.props.credentials,
      sessionId
    });

    this.socket.on(`${AppConfig.events.ON_LOGENTRY}_${sessionId}` , (data) => worker.postMessage({buffer: data}) );
    this.socket.on(`${AppConfig.events.ON_LOG_READY}_${sessionId}`, (data) => this.props.handleLogListenerIsReady() );
    this.socket.on(`${AppConfig.events.ON_ERROR}_${sessionId}`, (data) => {
      let dataView = new DataView(data);
      let decoder = new TextDecoder('utf-8');
      let errorMessage = decoder.decode(dataView);
      this.props.handleErrorMessage(errorMessage);
    } );
    this.socket.on(`${AppConfig.events.ON_LOGIN_ERROR}_${sessionId}`, (data) => {
      this.props.handleErrorMessage(data);
    });
    this.socket.on(AppConfig.events.ON_CONNECT_ERROR, (err) => {
        this.props.handleErrorMessage({level:'connect-error' });
        this.socket.close();
      });
  }

  updateLoggerState(logLevel, message) {
    if (this.props.logEntries[logLevel] &&
      Object.keys(this.props.logEntries[logLevel]).length > this.props.bufferSize) {
      this.props.resetLogEntries(logLevel);
    }

    this.props.addLogEntryToState(logLevel, message);
    this.props.incrementLogEntryCounter(logLevel);
  }

  isLogEntryExist(logLevel, entry) {
    return this.props.logEntries[logLevel] && this.props.logEntries[logLevel][entry];
  }

  validateFilters(logEntry) {
    /*return !this.state.settings.filters.length || this.state.settings.filters.filter((filter) => {
        if (!filter.active) return true;

        let regExp = new RegExp(filter.expression);
        let filterPassed = filter.not ? !regExp.test(logEntry) : regExp.test(logEntry);
        return filterPassed;

    }).length;
    */

    let passed = [];
    !this.props.filters.length || this.props.filters.map((filter) => {
        if (!filter.active) return true;

        let regExp = new RegExp(filter.expression, 'ig');
        let filterPassed = filter.not ? !regExp.test(logEntry) : regExp.test(logEntry);
        passed.push(filterPassed);
        return null;
    });

    let numPassed = passed.length;
    let out = passed.filter((el) => el).length;
    return out === numPassed;

  }

  isKnown(logEntryStr) {
    let out = AppConfig.log.knownIssues
    .filter((issue) => {
      let passed = new RegExp(issue.error).test(logEntryStr);
      return passed;
    });
    return out.length;
  }

  determineEntryLogLevel(logEntry) {
    return AppConfig.errorLevels.filter((errorLevel) => {
      return (new RegExp(errorLevel.key, 'g').test(logEntry));
    })[0].type;
  }

  addLogEntry(logEntry) {
   let logLevelRx = new RegExp(this.props.logLevel.join('|'));


   let machineNameRx = new RegExp(`${this.props.machine < 9 ? AppConfig.log.entries.machinePrefix : ''}${this.props.machine}`);

   if (
     this.props.monitorState > 0 &&   // ACTIVE or PAUSED
     logLevelRx.test(logEntry) &&     // Test LogErrorLevel
     this.validateFilters(logEntry) &&
     (this.props.machine === 0 || machineNameRx.test(logEntry)) // Test machine name
   ) {

      let logEntryArr = new RegExp(this.props.credentials.parseExp, 'g').exec(logEntry);
      let logEntryStr = logEntryArr && logEntryArr[1] ? logEntryArr[1] : logEntry
      let entryLogLevel = this.determineEntryLogLevel(logEntry);
  		if (!this.isLogEntryExist(entryLogLevel, logEntryStr)) {

        let signature = logEntry.split(`[${entryLogLevel}]`)[0];
  			this.updateLoggerState(entryLogLevel,
          {
            key: logEntryStr,
            signature: signature,
            isKnown: this.isKnown(logEntryStr), //TODO: do this only for Errors
            entryType: entryLogLevel
          }
        );

  		}
  	} else {
      //console.log('.');
    }
  }

  render() {
    let {
      itemsToLog,
      counters,
      filter,
      moreSettingsModalVisible,
      filters,
      credentials,
      dismissErrorMessage,
      hideKnown
    } = this.props;

    return (
      <div>
        <Layout state={{counters, filter, itemsToLog, moreSettingsModalVisible, filters, isLoading: credentials.loading, hideKnown}} />
        <ErrorMessage
          show={credentials.error}
          message={{title: 'Log error', text: credentials.error}}
          onClose={dismissErrorMessage}
        />
    </div>
    );

  }
}

function mapDispatchToProps(dispatch) {
  return {
    addLogEntryToState: (logLevel, message) => dispatch(logActions.addLogEntry(logLevel, message)),
    resetLogEntries: (logLevel) => dispatch(logActions.resetLogEntries(logLevel)),
    incrementLogEntryCounter: (logLevel) => dispatch(countersActions.incrementCounter(logLevel)),
    handleErrorMessage: (errorData) => dispatch(loginActions.error(errorData)),
    dismissErrorMessage: () =>  dispatch(loginActions.ready()),
    handleLogListenerIsReady: () =>  dispatch(loginActions.ready())
  }
}

function mapStateToProps(state) {
  return {
    logLevel: state.logLevel,
    logEntries: state.logEntries,
    itemsToLog: selectors.joinLogItems(state),
    counters: selectors.filterCounters(state),
    machine: state.machine,
    filter: state.filter,
    monitorState: state.monitorState,
    bufferSize: state.bufferSize,
    moreSettingsModalVisible: state.moreSettingsModalVisible,
    filters: state.filters,
    credentials: state.credentials,
    hideKnown: state.hideKnown
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
