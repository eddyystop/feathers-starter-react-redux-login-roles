
const debug = require('debug')('middleware:logger');
const errors = require('feathers-errors');

debug('Required');

module.exports = () => (req, res, next) => {
  debug(`Page ${req.originalUrl} not found`);

  next(new errors.NotFound(`Page ${req.originalUrl} not found`));
};
