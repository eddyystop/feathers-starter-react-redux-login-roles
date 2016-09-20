
const path = require('path');

const root = process.cwd();

module.exports = {
  logs: {
    logLevel: 'silly',
    path: path.join(root, 'logs-dev'),
    logConsoleLevel: 'silly',
  },
  database: {
    path: path.join(root, 'data-dev'),
  },
};
