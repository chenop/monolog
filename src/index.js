import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import {initialState} from './config';
//import App from './App';
import Gate from './Gate';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/index.css';

const store = createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <Gate />
  </Provider>,
  document.getElementById('root')
);
