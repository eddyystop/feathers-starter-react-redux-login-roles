
/* eslint no-console: 0 */

const message = require('./message');
const authentication = require('./authentication');
const verifyReset = require('./verifyReset');
const user = require('./user');

module.exports = function () { // 'function' needed as we use 'this'
  const app = this;

  app.configure(authentication);
  app.configure(verifyReset);
  app.configure(user);
  app.configure(message);
};
