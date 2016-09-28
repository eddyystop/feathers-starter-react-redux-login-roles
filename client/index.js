
import makeDebug from 'debug';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';


import configureStore from './store';
import { feathersServices, feathersAuthentication } from './feathers'; // does feathers init
import { setClientValidationsConfig } from '../common/helpers/usersClientValidations';
import { configLoad } from './utils/config';
import { initLogger, logger } from './utils/loggerRedux';
import './utils/react-tap-event';

// __processEnvNODE_ENV__ is replaced during the webpack build process
const nodeEnv = __processEnvNODE_ENV__; // eslint-disable-line no-undef, camelcase
const debug = makeDebug('index');

debug(`client starting. Built for ${nodeEnv} env.`);
console.log(`..This bundle was built for the ${nodeEnv} env.`); // eslint-disable-line no-console

// Initialize Redux
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

// Handle uncaught exceptions.
if (nodeEnv === 'production') {
  setupOnUncaughtExceptions();
}

// Sign in with the JWT currently in localStorage
if (localStorage['feathers-jwt']) {
  store.dispatch(feathersAuthentication.authenticate())
    .catch(err => {
      console.log('authenticate catch', err); // eslint-disable-line no-console
      return err;
    });
}

// Get client config
configLoad(store, feathersServices)
  .then(clientConfig => { // the rest of the client startup requires the config be loaded
    // Setup client logger first so we can log asap
    initLogger(store.dispatch, feathersServices.logs);
    logger('info', 'Agent connected'); // todo You may want to remove this

    // Explicitly pass the config to code common to both server and client.
    setClientValidationsConfig(clientConfig);

    // Setup React Router which starts up the rest of the app.
    // A hack. Lemme know if you have a better idea.
    const router = require('./router').default; // eslint-disable-line global-require

    router(store, history);
  });
  // you cannot place a catch here because of the require inside then()

// Handle uncaught exceptions
function setupOnUncaughtExceptions() { // eslint-disable-line no-unused-vars
  window.addEventListener('error', (e) => {
    e.preventDefault();
    const error = e.error;
    console.error( // eslint-disable-line no-console
      'onUncaughtExceptions caught error:\n', error
    );

    const message = error.message || ''; // eslint-disable-line no-unused-vars
    const stack = (error.stack || '').split('\n'); // eslint-disable-line no-unused-vars

    // We cannot depend on the logger running properly. Try to log to server directly.
    if (store && store.dispatch && feathersServices && feathersServices.logs) {
      store.dispatch(feathersServices.logs.create({
        level: 'error',
        msg: 'Uncaught exception',
        error: { message, stack, deviceId: localStorage.deviceId },
      }))
        .catch(err => console.log( // eslint-disable-line no-console
          'onUncaughtExceptions error while logging:\n', err
        ));
    }
  });
}
