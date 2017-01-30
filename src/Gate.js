import React, { Component } from 'react';
import {connect} from 'react-redux';
import AppConfig from './config';
import App from './App';
import ErrorMessage from './components/ErrorMessage';
import LogIn from './components/LogIn';
import * as loginAction from './actions/login';

class Gate extends Component {

  render() {
    let {
      username,
      password,
      error,
      dismissErrorMessage
    } = this.props;
    return (
      username && password && !error
      ? <App />
      : <div>
          {
            error
            ? <ErrorMessage
                show={true}
                message={error.level ? AppConfig.serverErrors[error.level].message : {title: 'Log Error', text: error}}
                onClose={dismissErrorMessage}
              />
            : <LogIn />
          }
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dismissErrorMessage: () => dispatch(loginAction.reLogin())
  }
};

const mapStateToProps = (state) => {
  return {
    username: state.credentials.username,
    password: state.credentials.password,
    error: state.credentials.error,
    loading: state.credentials.loading
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Gate);
