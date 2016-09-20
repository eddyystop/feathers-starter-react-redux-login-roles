
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store';
import { feathersAuthentication } from './feathers';
import router from './router';
import './utils/react-tap-event';
import makeDebug from './utils/debug-isomorphic';

const debug = makeDebug('index');
debug('client starting');

console.log(`..This bundle was built for the ${__processEnvNODE_ENV__} environment.`);

// Initialize Redux
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

// Handle uncaught exceptions.
if (__processEnvNODE_ENV__ === 'production') {
  setupOnUncaughtExceptions();
}

// Sign in with the JWT currently in localStorage
if (localStorage['feathers-jwt']) {
  store.dispatch(feathersAuthentication.authenticate());
}

// Setup React router
router(store, history);

// Handle uncaught exceptions
function setupOnUncaughtExceptions() { // eslint-disable-line no-unused-vars
  window.addEventListener('error', (e) => {
    e.preventDefault();
    const error = e.error;
    console.error(error); // eslint-disable-line no-console

    const message = error.message || ''; // eslint-disable-line no-unused-vars
    const stack = (error.stack || '').split('\n'); // eslint-disable-line no-unused-vars
    /*
    store.dispatch(writeLogEntry('error', 'client uncaught exception',
      { error: { message, stack }, tags: 'client:error' }
    ));
    */
  });
}
