
/* eslint no-console: 0 */

// Define environment variables
require('dotenv').config({ silent: true });

// Initialize logger
const logger = require('./utils/loggerProduction');

logger.info('==============================================================');
logger.info(`Server initialization started in ${process.env.NODE_ENV.toUpperCase()} mode.`,
  { tags: 'server' });
logger.info('==============================================================');

// Handle uncaught exceptions
handleUncaughtException();

// Validate environment variables
const environmentalVariablesValidation = require('./validations/environmentalVariablesValidation');
environmentalVariablesValidation(logger);

// Start server
const port = normalizePort(process.env.PORT);

const app = require('./app');
const server = app.listen(port)
  .on('error', onError)
  .on('listening', onListening);

// Handle uncaught exceptions
// Consider enhancements at: https://coderwall.com/p/4yis4w/node-js-uncaught-exceptions
function handleUncaughtException() {
  process.on('uncaughtException', (error) => {
    console.error('\n\n=== uncaught exception ================='); // eslint-disable-line no-console
    console.error(error.message); // eslint-disable-line no-console
    console.error(error.stack); // eslint-disable-line no-console
    console.error('========================================\n\n')

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
  logger.info(`Server listening on ${bind}`, { tags: 'server' });
}

// Exit process
function exitProcess(code = 1) {
  logger.error('========================================');
  logger.error('Exit Process', {  error: { code }, tags: 'exit' });
  logger.error('========================================');

  // Wait long enough for all log entries to be written.
  setTimeout(() => {
    process.exit(code);
  }, 1000);
}
