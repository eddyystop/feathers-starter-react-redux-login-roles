
const envalid = require('envalid');
const config = require('../../config/config');

module.exports = function environmentalVariablesValidation(app, logger) {
  const strPropType = envalid.str;

  // valid NODE_ENV values.
  const nodeEnv = {
    production: 'production',
    prod: 'production',
    development: 'development',
    dev: 'development',
    devserver: 'devserver',
    testing: 'devserver',
    test: 'devserver',
  };

  const cleanEnv = envalid.cleanEnv(process.env,
    {
      NODE_ENV: strPropType({
        choices: Object.keys(nodeEnv),
        default: config.env.NODE_ENV,
        desc: 'processing environment',
      }),
      PORT: strPropType({
        default: config.env.PORT,
        desc: 'port or named pipe',
      }),
      LOG_LEVEL: strPropType({
        choices: ['error', 'warn', 'info', 'verbose', 'debug', 'silly'],
        default: config.env.LOG_LEVEL,
        desc: 'minimum level for logs written to file',
      }),
      LOG_CONSOLE_LEVEL: strPropType({
        choices: ['error', 'warn', 'info', 'verbose', 'debug', 'silly'],
        default: config.env.LOG_LEVEL_CONSOLE,
        desc: 'minimum level for logs displayed on console',
      }),
      DEBUG: strPropType({
        default: config.env.DEBUG,
        desc: 'debug namespaces to display',
      }),
    },
    {
      reporter: (obj) => {
        const errors = obj.errors;

        if (errors && Object.keys(errors).length !== 0) {
          Object.keys(errors).forEach((variable) => {
            const message = errors[variable].message;
            logger.error('Invalid environment variable. Exiting.',
              { data: { variable, message }, tags: 'exit' });
          });

          exitProcess(101);
        }
      },
    }
  );

  process.env.NODE_ENV = nodeEnv[cleanEnv.NODE_ENV];
  process.env.PORT = cleanEnv.PORT;
  process.env.LOG_LEVEL = cleanEnv.LOG_LEVEL;
  process.env.LOG_LEVEL = process.env.LOG_LEVEL || './logs/log.log';
  process.env.LOG_CONSOLE_LEVEL = cleanEnv.LOG_CONSOLE_LEVEL;
  process.env.DEBUG = cleanEnv.DEBUG;

  logger.info('Environment variables.', {
    data: {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      LOG_LEVEL: process.env.LOG_LEVEL,
      LOG_FILE: process.env.LOG_FILE,
      LOG_CONSOLE_LEVEL: process.env.LOG_CONSOLE_LEVEL,
      DEBUG: process.env.DEBUG,
    },
    tags: 'server',
  });
};

// Exit process
function exitProcess(code = 1) {
  // Wait long enough for all log entries to be written.
  setTimeout(() => {
    console.error( // eslint-disable-line no-console
      '\n\n========================================\n' +
      `..exit.. Exiting with error code ${code}.` +
      '\n========================================\n\n'
    );
    process.exit(code);
  }, 1000);
}
