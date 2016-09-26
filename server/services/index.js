
/* eslint no-console: 0, no-param-reassign: 0 */

const debug = require('debug')('service:index');
const config = require('config');
const auth = require('feathers-authentication').hooks;

const authentication = require('./authentication');
const verifyReset = require('./verifyReset');
const user = require('./user');
const message = require('./message');
const tryHook = require('./hooks/tryHook');
const logger = require('../utils/loggerProduction');

debug('Required');

module.exports = function () { // 'function' needed as we use 'this'
  debug('Config');
  const app = this;

  app.configure(authentication);
  app.configure(verifyReset);
  app.configure(user);
  app.configure(message);

  // get client config file
  app.use('/config', {
    get() {
      return Promise.resolve(config.clientConfig);
    },
  });

  // create log entry
  app.use('/logs', {
    before: {
      create: [
        tryHook(auth.verifyToken()),
        tryHook(auth.populateUser()),
      ],
    },
    create({ level, msg, payload }, params) {
      const paramsUser = params.user;

      if (paramsUser && (paramsUser.email || paramsUser.username)) {
        payload.user = payload.user || {};

        if (paramsUser.email) {
          payload.user.email = paramsUser.email;
        }
        if (paramsUser.username) {
          payload.user.username = paramsUser.username;
        }
      }

      if (!payload.tags) {
        payload.tags = 'client';
      }

      logger[level](msg, payload);

      // Note: Redux's action.payload will contain undefined instead of null
      return Promise.resolve(null);
    },
  });

  debug('Config complete');
};
