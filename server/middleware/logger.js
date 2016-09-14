
const winston = require('winston');

module.exports = (app) => {
  // Add a logger to our app object for convenience
  app.logger = winston; // eslint-disable-line no-param-reassign

  return (error, req, res, next) => {
    console.log('********** REST logger', req.originalUrl); // eslint-disable-line no-console
    if (error) {
      const message = `${error.code ? `(${error.code}) ` : ''}Route: ${req.url} - ${error.message}`;

      if (error.code === 404) {
        winston.info(message);
      } else {
        winston.error(message);
        winston.info(error.stack);
      }
    }

    next(error);
  };
};
