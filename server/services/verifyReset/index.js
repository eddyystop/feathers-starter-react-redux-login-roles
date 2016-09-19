
/* eslint no-console: 0, quotes: 0 */

const verifyReset = require('feathers-service-verify-reset').service;
const emailer = require('../../helpers/emails');

module.exports = function () { // 'function' needed as we use 'this'
  const app = this;

  app.configure(verifyReset({ emailer }));
};
