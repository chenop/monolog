const config = {
  monitorStateModes: {
    0: 'PAUSED',
    1: 'ACTIVE'
  },
  errorLevels: [
    {key: 'CriticalLogLevel', label: 'CriticalLogLevel', type:'CriticalLogLevel',  color: 'rgba(255,0,0,0.9)'},
    {key: 'ErrorLogLevel', label: 'ErrorLogLevel', type:'ErrorLogLevel', color: 'rgba(255,0,0,0.4)'},
    {key: 'WarningLogLevel', label: 'WarningLogLevel', type:'WarningLogLevel', color: 'rgba(255,190,0,0.4)'},
    {key: 'InformationLogLevel', label: 'InformationLogLevel', type:'InformationLogLevel', color: 'rgba(0,183,255,0.4)'},

    {key: 'FATAL', label: 'FATAL', type: 'CriticalLogLevel', color: 'rgba(255,0,0,0.9)'},
    {key: 'ERROR', label: 'ERROR', type: 'ErrorLogLevel', color: 'rgba(255,0,0,0.4)'},
    {key: 'INFO', label: 'INFO', type: 'InformationLogLevel', color: 'rgba(0,183,255,0.4)'},
    {key: 'WARN', label: 'WARN', type: 'WarningLogLevel', color: 'rgba(255,190,0,0.4)'}
  ],
  machines: [
    {key: 0, label: 'Any'},
    {key: 1, label: 'WILTQSIIS 1'},
    {key: 2, label: 'WILTQSIIS 2'},
    {key: 3, label: 'WILTQSIIS 3'}
  ],
  bufferSizes: [
    { key: 50, label: '50'},
    { key: 100, label: '100'},
    { key: 200, label: '200'},
    { key: Infinity, label: 'Unlimited', disabled: true}
  ],
  log: {
    PROTOCOL: 'http',
    HOST: location.hostname,
    PORT: 3000,
    parseExpression: 'LogLevel\\]([\\s\\S]*)\\+\\+\\+Context',
    entries: {
      machinePrefix: 'WILTQSIIS',
      contextDivider: '+++Context Information+++'
    },
    knownIssues: [
      {error: 'GetResponseVectorForCurrentPanelist', mark: true},
      {error: 'AppendProvinceAnswerIdByCultureAndTextualValue', mark: true},
      {error: 'TranslateTolunaPropertiesToTqsPanelistDetails', mark: true},
      {error: 'ProcessSurveyPageAndUpdateSession', mark: true},
      {error: 'ProcessSurveyPage throw exception', mark: true},
      {error: 'EndSurveyProcedure RV validation found missing page', mark: true},
      {error: 'TQSRuntime.aspx - Client side - Failed to $.post', mark: true},
      {error: 'LockingCachingAndRevisioningTemplate', mark: true},
      {error: 'SurveyAccessStats', mark: true},
      {error: 'System.Web.HttpException (0x80004005)', mark: true},
      {error: 'System.ArgumentException: SSDFactory GetFromEncryptedEncoded', mark: true},
      {error: 'TQSV2.SurveyRevisionDoesNotExistException', mark: true},
      {error: '[ThreadPoolCallback] - duplicate panelist encountered for panelist ID', mark: true},
      {error: '[PremiumSubscriptionsDataManager.GetPremiumSubscriptionsForUser] Error getting premium subscriptions list.', mark: true},
      {error: '[TolunaQ] OneDimQuestionResponseMapper could not find answer for attribute', mark: true},
      {error: '[TolunaCMS] Memcached Set Failed with exception for key=OCMS_Modules_5368 value=System.Collections.Generic.List`1[TolunaCMS.Web.Models.Module]', mark: true},
    ]
  },
  serverErrors: {
    'connect-error': {
      message: {
        title: 'Server connection error',
        text: `<strong>xhr-poll-error</strong><br/>
        It seems that connection to the server was interrupted! <br/>
        Please try logging in again or talk to your system admin.`
      }
    },
    'client-socket': {
      message: {
        title: 'Socket connection error',
        text: `
          <strong>client-socket-error</strong><br/>
          An error has ocurred while connecting to the server! <br/>
          Please check Host name and port and try again.`
      }
    },
    'client-authentication': {
      message: {
        title: 'Authentication error',
        text: `
          <strong>client-authentication error</strong><br/>
          An error has ocurred durring the log in process<br/>
          Please check username and password and try again.`
      }
    }
  },
  events: {
    ON_LOGENTRY: 'log',
    ON_ERROR: 'log_error',
    ON_LOGIN_ERROR: 'login_error',
    ON_LOG_READY: 'log_ready',
    ON_CONNECT_ERROR: 'connect_error'
  }
}


export const initialState = {
  logEntries: {
   InformationLogLevel: {},
   ErrorLogLevel: {},
   WarningLogLevel: {},
   CriticalLogLevel:{}
  },
  counters: {
   InformationLogLevel: 0,
   ErrorLogLevel: 0,
   WarningLogLevel: 0,
   CriticalLogLevel: 0,
 },
  machine: 0,
  logLevel: [config.errorLevels[0].key, config.errorLevels[1].key],
  filter: '',
  monitorState: 1,
  bufferSize: 100,
  moreSettingsModalVisible: false,
  credentials: {
    username: '', //'root',
    password: '', //'admin12',
    host: '10.0.213.236',//'10.0.128.156',
    port: 22,
    path: '/var/log/tat/toluna.log'//'/TQS/tqs.log'
  },
  filters:[],
  hideKnown: true

};

export default config;
