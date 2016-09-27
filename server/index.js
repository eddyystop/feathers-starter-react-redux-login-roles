
/* eslint no-console: 0 */

const debug = require('debug')('server:index');
const environmentVariablesValidation = require('./validations/environmentVariablesValidation');

// Load environment variables.
debug('Load environment variables');
require('dotenv').config({ silent: true });

// Validate & sanitize env vars. (We need a sanitized NODE_ENV before we can do anything else.)
debug('Sanitize env vars');
const [envErrs, env] = environmentVariablesValidation();

// Load the app configuration, now that we have a valid NODE_ENV
debug('Load app config');
const config = require('config');

Object.freeze(config); // prevent anything, anywhere from changing the config

// Initialize logger, now that we have a valid config
debug('Start logger');
const logger = require('./utils/loggerProduction');

logger.info('==============================================================');
logger.info(`Server initialization started in ${config.NODE_ENV.toUpperCase()} mode.`,
  { tags: 'server' });
logger.info('==============================================================');

// Log env vars
debug('Log env vars');
if (envErrs) {
  logger.error('Env var errors. Exiting.', { errors: envErrs, tags: 'exit' });
  exitProcess(101);
}

logger.info('Env vars', { data: env, tags: 'server' });

// Log config
debug('Log config');
if (config.isProduction) {
  logger.info('App config', { data: config, tags: 'server' });
}

// Handler for uncaught exceptions
debug('Handler for uncaught exceptions');
handleUncaughtException();

// Pass config to whatever needs it
const usersClientValidations = require('../common/helpers/usersClientValidations');

usersClientValidations.setClientValidationsConfig(config);

// Start server
const port = normalizePort(config.server.port);

debug('Require app');
const app = require('./app');

debug('Start server');
const server = app.listen(port)
  .on('error', onError)
  .on('listening', onListening);

// Handle uncaught exceptions
// Consider enhancements at: https://coderwall.com/p/4yis4w/node-js-uncaught-exceptions
function handleUncaughtException() {
  process.on('uncaughtException', (error) => {
    debug('Uncaught exception');
    console.error('\n\n=== uncaught exception ================='); // eslint-disable-line no-console
    console.error(error.message); // eslint-disable-line no-console
    console.error(error.stack); // eslint-disable-line no-console
    console.error('========================================\n\n');

    const message = error.message || '';
    const stack = (error.stack || '').split('\n');
    logger.error('Uncaught exception. Exiting.', { error: { message, stack }, tags: 'exit' });

    exitProcess(100);
  });
}

// Normalize a port into a number, string, or false.
function normalizePort(val) {
  const portNumb = parseInt(val, 10);

  if (isNaN(portNumb)) {
    return val; // named pipe
  }

  if (portNumb >= 0) {
    return portNumb; // port number
  }

  return false;
}

// Event listener for HTTP server "error" event.
function onError(error) {
  debug('onError');
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges. Exiting.`, { error, tags: 'exit' });
      exitProcess(110);
      break;
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use. Exiting.`, { error, tags: 'exit' });
      exitProcess(111);
      break;
    default:
      logger.error('HTTP server error', { error, tags: 'server' });
      throw error;
  }
}

// Event listener for HTTP server "listening" event.
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;

  debug(`Server listening on ${bind}`);
  logger.info(`Server listening on ${bind}`, { tags: 'server' });
}

// Exit process
function exitProcess(code = 1) {
  debug(`Exit code ${code}`);
  logger.error('========================================');
  logger.error('Exit Process', { error: { code }, tags: 'exit' });
  logger.error('========================================');

  // Wait long enough for all log entries to be written.
  setTimeout(() => {
    process.exit(code);
  }, 1000);
}
