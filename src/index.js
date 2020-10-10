import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './components/App';
/*import * as serviceWorker from './serviceWorker';*//////

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./store/reducers";

import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import firebase from "./services/firebase";


const store = createStore(
  reducers,
  {},
  applyMiddleware(reduxThunk)
);

const rrfConfig = {};
const fbConfig = {};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Router>
          <App />
      </Router>
    </ReactReduxFirebaseProvider>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
