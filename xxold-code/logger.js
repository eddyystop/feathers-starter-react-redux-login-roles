
// Start the production or fake logger

const loggerProduction = require('./loggerProduction'); // production logger
const loggerFake = require('./loggerFake'); // fake logger

// Start logger
switch (process.env.LOG_LOGGER) {
  case 'fake':
    var logger = loggerFake();
    break;
  case 'prod': // fall through
  case 'production':
    logger = loggerProduction();
    break;
  case 'switch': // fall through
  default:
    logger = process.env.NODE_ENV.indexOf('prod') === -1 ? loggerFake() : loggerProduction();
    break;
}

module.exports = logger;
