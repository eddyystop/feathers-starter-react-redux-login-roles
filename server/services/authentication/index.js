
const debug = require('debug')('service:feathers-authentication');
const authentication = require('feathers-authentication');

debug('Required');

module.exports = function () { // 'function' needed as we use 'this'
  debug('Config');
  const app = this;

  app.configure(authentication());

  debug('Config complete');
};
