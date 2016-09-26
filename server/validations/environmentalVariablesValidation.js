
const debug = require('debug')('validation:envalid');
const envalid = require('envalid');

debug('Has been required');

module.exports = function environmentalVariablesValidation() {
  debug('Called');
  const envLoaded = {};
  const errors = {};
  const strPropType = envalid.str;

  // Valid NODE_ENV values
  const nodeEnv = {
    production: 'production',
    prod: 'production',
    development: 'development',
    dev: 'development',
    devserver: 'devserver',
    testing: 'development',
    test: 'development',
  };

  // Validation specs. Default is '' when ENV var is optional.
  const validations = {
    NODE_ENV: strPropType({ // mandatory
      choices: Object.keys(nodeEnv),
      default: 'production',
      desc: 'processing environment',
    }),
    PORT: strPropType({
      default: '',
      desc: 'port or named pipe',
    }),
    LOG_LEVEL: strPropType({
      choices: ['', 'error', 'warn', 'info', 'verbose', 'debug', 'silly'],
      default: '',
      desc: 'minimum level for logs written to file',
    }),
    LOG_CONSOLE_LEVEL: strPropType({
      choices: ['', 'error', 'warn', 'info', 'verbose', 'debug', 'silly'],
      default: '',
      desc: 'minimum level for logs displayed on console',
    }),
  };

  // Validate
  const cleanEnv = envalid.cleanEnv(process.env, validations, {
    // Extract errors
    reporter: (obj) => {
      const objErrors = obj.errors;

      if (objErrors && Object.keys(objErrors).length !== 0) {
        Object.keys(objErrors).forEach(variable => {
          errors[variable] = objErrors[variable].message;
        });
      }
    },
  });

  if (Object.keys(errors).length !== 0) {
    debug(`errors ${JSON.stringify(errors)}`);
    return [errors];
  }

  // Set env variables
  Object.keys(validations).forEach(variable => {
    if (cleanEnv[variable] !== '') {
      const cleanValue = variable === 'NODE_ENV' ? nodeEnv[cleanEnv.NODE_ENV] : cleanEnv[variable];

      process.env[variable] = cleanValue;
      envLoaded[variable] = cleanValue;
    }
  });

  debug(`env found ${JSON.stringify(envLoaded)}`);
  return [null, envLoaded];
};
