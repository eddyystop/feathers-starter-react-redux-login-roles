
const path = require('path');

const root = process.cwd();

module.exports = {
  logs: {
    logLevel: 'info',
    path: path.join(root, 'logs'),
    logConsoleLevel: 'info',
  },
  database: {
    path: path.join(root, 'data'),
  },
};
