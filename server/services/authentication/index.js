
const authentication = require('feathers-authentication');

module.exports = function () { // 'function' needed as we use 'this'
  const app = this;

  const config = app.get('auth');

  app.configure(authentication(config));
};
