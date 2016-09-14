
/* global io, window */

import feathers from 'feathers-client';
import reduxifyServices, { getServicesStatus } from 'feathers-reduxify-services';
import reduxifyAuthentication from 'feathers-reduxify-authentication';
import config from '../../config/config';

const socket = io();

// Store app configuration
export const appConfig = config;

// Configure feathers-client
const app = feathers()
  .configure(feathers.socketio(socket))
  .configure(feathers.hooks())
  .configure(feathers.authentication({
    storage: window.localStorage, // store the token in localStorage and initially sign in with that
  }));
export default app;

// Reduxify feathers-authentication
export const feathersAuthentication = reduxifyAuthentication(app,
  { isUserAuthorized: (user) => user.isVerified } // user must be verified to authenticate
);

// Configure feathers-service-verify-reset custom service
const verifyResetRoute = '/verifyReset/:action/:value'; // must match what server uses
const verifyReset = app.service(verifyResetRoute); // eslint-disable-line no-unused-vars

// Reduxify feathers services
export const feathersServices = reduxifyServices(app, {
  users: 'users', messages: 'messages', [verifyResetRoute]: 'verifyReset', // path: humanName
});

// Convenience method to get status of feathers services, incl feathers-authentication
const stateSlices = ['auth', 'users', 'messages', 'verifyReset'];
export const getFeathersStatus =
  (servicesRootState, names = stateSlices) => getServicesStatus(servicesRootState, names);

// Convenience list of feathers services
export const feathersServiceNames = ['users', 'messages', verifyResetRoute];
