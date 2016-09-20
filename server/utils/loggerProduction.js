
/*
 Log entries written to files are in JSON format. The high-level properties are:

 level      string, mandatory, from highest: 'error', 'warn', 'info', 'verbose', 'debug', 'silly'
 message    string, mandatory, short message describing the circumstances
 timestamp  string date, mandatory, '2016-06-09T19:06:46.298Z'
 tags       string or array of strings, mandatory, terms to help categorize entry
 data       string, optional, additional information, usually JSON.stringify(obj)
 error      object, optional, error object usually constructed by Error constructor

 Server requests are logged by morgan. They include only level, message and timestamp.
 Message is a stringified object.

 Log entries can be written with:

 const logger = require('./utils/logger');
 logger.setLevels({ console: 'debug', file: 'debug' });
 app.use(logger.setMorgan()); // if using Express

 logger.verbose(`Start server port ${port}`, { tags: 'serverStart' });
 logger.info('JSON schema invalid', { data: obj, tags: 'joi' });

 function callback(err) {
 if (err) {
 logger.error('HTTP server error', { error, tags: 'httpError' });
 ...
 }
 }
 */

const winston = require('winston');
const morgan = require('morgan');
const debug = require('debug')('logger');

const isProduction = (process.env.NODE_ENV || '').indexOf('prod') !== -1;
winston.emitErrs = true;

const transports = [
  new winston.transports.Console({
    level: process.env.LOG_CONSOLE_LEVEL,
    handleExceptions: true,
    json: false,
    colorize: true,
  }),
];

if (isProduction) {
  transports.push(
    // configure the log file
    new winston.transports.File({
      level: process.env.LOG_LEVEL,
      filename: process.env.LOG_FILE,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
      timestamp: true,
    })
  );
}

const logger = new winston.Logger({
  transports,
  exitOnError: false,
});

logger.stream = {
  write(message) {
    logger.info(message);
  },
};

logger.setLevels = (levels) => {
  if (levels.console) {
    logger.transports.console.level = levels.console;
    debug(`set console logger level to ${levels.console}`);
  }
  if (isProduction && levels.file) {
    logger.transports.file.level = levels.file;
    debug(`set file logger level to ${levels.file}`);
  }
};

logger.setMorgan = () => {
  morgan.token('username', (req) => (req.user ? req.user.username || '' : '')); // from middleware

  const terseFormat = '{"method":":method", "url":":url", "status":":status", ' +
    '"ms":":response-time"}';

  const verboseFormat = [
    '{',
    '"method": ":method", "url": ":url", "status": ":status", "res_time": ":response-time", ',
    '"remote_addr": ":remote-addr", "remote_user": ":remote-user", "date": ":date[clf]", ',
    '"result_length": ":res[content-length]", "referrer": ":referrer", ',
    '"user_agent": ":user-agent", "http_version": ":http-version"',
    '}',
  ].join('');

  return morgan(
    isProduction ? terseFormat : 'tiny',
    { stream: logger.stream }
  );
};

module.exports = logger;
