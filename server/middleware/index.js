
const errorsHandler = require('feathers-errors/handler');
const notFoundHandler = require('./not-found-handler');

module.exports = function () { // 'function' needed as we use 'this'
  // Add your custom middleware here. Remember, that
  // just like Express the order matters, so error
  // handling middleware should go last.
  const app = this;

  app.use(notFoundHandler());
  app.use(errorsHandler());
};
