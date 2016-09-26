
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

const debug = require('debug')('server:loggerProduction');
const path = require('path');
const winston = require('winston');
const morgan = require('morgan');
const config = require('config');

debug('Has been required');

const last2 = (numb) => `0${numb}`.slice(-2);

const isProduction = config.isProduction;
winston.emitErrs = true;

const transports = [
  new winston.transports.Console({
    level: config.logs.logConsoleLevel,
    timestamp: () => {
      const date = new Date();
      return `${last2(date.getHours())}:${last2(date.getMinutes())}:${last2(date.getSeconds())}`;
    },
    handleExceptions: true,
    json: false,
    colorize: true,
  }),
];

if (isProduction) {
  debug('Add file logger');
  transports.push(
    // Setup the log file
    new winston.transports.File({
      level: config.logs.logLevel,
      filename: path.join(config.logs.path, config.logs.fileName),
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
      timestamp: true,
    })
  );
}

debug('Create logger');
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
  debug(`Set levels ${JSON.stringify(levels)}`);
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
  debug('Setup HTTP request logging');
  morgan.token('username', (req) => (req.user ? req.user.username || '' : '')); // from middleware

  const verboseFormat = [ // eslint-disable-line no-unused-vars
    '{',
    '"method": ":method", "url": ":url", "status": ":status", "res_time": ":response-time", ',
    '"remote_addr": ":remote-addr", "remote_user": ":remote-user", "date": ":date[clf]", ',
    '"result_length": ":res[content-length]", "referrer": ":referrer", ',
    '"user_agent": ":user-agent", "http_version": ":http-version"',
    '}',
  ].join('');

  const terseFormat =
    '{"method":":method", "url":":url", "status":":status", "ms":":response-time"}';

  const devFormat = ':method :url (:status) :response-time';

  return morgan(
    isProduction ? terseFormat : devFormat,
    { stream: logger.stream }
  );
};

module.exports = logger;
