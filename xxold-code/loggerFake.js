
/* eslint  no-console: 0 */

// Null logger. Fake a winston logger.

const util = require('util');

const logMsg = (level) => (desc, load) => {
  const loadStr = load ? util.inspect(load, { depth: 3, color: true }) : '';
  console.log(`..${level}.. ${desc}${loadStr ? '\n' : ''}${loadStr}`);
};

module.exports = {
  error: logMsg('error'),
  warn: logMsg('warn'),
  info: logMsg('info'),
  verbose: logMsg('verbose'),
  debug: logMsg('debug'),
  silly: logMsg('silly'),
};
