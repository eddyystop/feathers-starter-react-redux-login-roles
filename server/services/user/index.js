
const debug = require('debug')('service:user');
const path = require('path');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const config = require('config');

const hooks = require('./hooks');

debug('Required');

module.exports = function () { // 'function' needed as we use 'this'
  const app = this;
  const fileName = path.join(config.database.path, 'users.db');
  debug(`Config for ${fileName}`);

  const db = new NeDB({
    filename: fileName,
    autoload: true,
  });

  const options = {
    Model: db,
    paginate: {
      default: 5,
      max: 25,
    },
  };

  // Initialize our service with any options it requires
  app.use('/users', service(options));

  // Get our initialize service to that we can bind hooks
  const userService = app.service('/users');

  // Set up our before hooks
  userService.before(hooks.before(app));

  // Set up our after hooks
  userService.after(hooks.after);

  debug('Config complete');
};
