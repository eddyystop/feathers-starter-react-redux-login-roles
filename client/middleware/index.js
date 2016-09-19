
// eslint no-unused-vars: 0,

import reduxThunk from 'redux-thunk';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import reduxMulti from 'redux-multi';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import loggerBasic from './loggerBasic'; // eslint-disable-line no-unused-vars

export default [
  reduxThunk, // Thunk middleware for Redux
  reduxMulti, // Dispatch multiple actions
  reduxPromiseMiddleware(), // Resolve, reject promises with conditional optimistic updates
  routerMiddleware(browserHistory), // !! IMPORTANT for location.href changes
  //loggerBasic, // A basic middleware logger
];
