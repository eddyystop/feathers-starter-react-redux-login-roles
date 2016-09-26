
/* eslint no-console: 0, quotes: 0 */

const debug = require('debug')('service:verifyReset');
const verifyReset = require('feathers-service-verify-reset').service;
const emailer = require('../../helpers/emails');

debug('Required');

module.exports = function () { // 'function' needed as we use 'this'
  debug('Config');
  const app = this;

  app.configure(verifyReset({ emailer }));

  debug('Config complete');
};
