
const path = require('path');

const sec = 1000;
const min = sec * 60;
const hr = min * 60;
const root = process.cwd();

module.exports = {
  NODE_ENV: undefined,
  DEBUG: undefined,
  server: {
    host: undefined,
    port: undefined,
    logsPath: undefined,
    publicPath: path.join(root, 'public'),
  },
  logs: {
    logLevel: undefined,
    path: undefined,
    logConsoleLevel: undefined,
  },
  auth: {
    token: {
      secret: undefined,
    },
    local: {},
  },
  client: {
    appName: 'Feathers-starter-react-redux-login-roles',
    defaultRoute: '/app', // *********************** need to get into server/app
  },
  database: {
    path: undefined,
    // property name of record key. either _id or id.
    idName: '_id', // ***************** is this used anywhere?
  },
  users: {
    roles: {
      forFirstUser: 'superAdmin admin', // used in server/validations/usersServerValidations.js
      default: '',
      allowedToChangeRoles: ['superAdmin', 'admin'],  // used in client/index.js
    },
  },
  authEmails: {
    expires: {
      signUpEmailTokenTimeValid: 24 * hr,
      signUpEmailTokenTimeValidText: '24 hours',
      forgotPasswordEmailTokenTimeValid: 30 * min,
      forgotPasswordEmailTokenTimeValidText: '30 minutes',
    },
    subs: {
      productName: '[feathers-starter-redux-login]',
      senderName: '[Feathers Starter]',
      fromEmail: 'jszwaronek@universal.com',
      productAddressLine1: '[Feathers Starter <feathers-starter@feathersjs.com>]', // **** rename
      productAddressLine2: '[http://feathersjs.com]', // ************************* rename
    },
    providers: {
      postmark: {
        fromEmail: undefined,
        postmarkApiToken: undefined,
      },
    },
  },
  validation: { // see also server/validations/schemas
    auth: {
      name: {
        re: /^[\sa-zA-Z]{8,30}$/,
        err: 'Name must be 8 or more letters or spaces.',
      },
      username: {
        re: /^[a-zA-Z0-9]{5,30}$/,
        err: 'Username must be 5 or more letters and numbers.',
      },
      password: {
        re: /^[\sa-zA-Z0-9]{8,30}$/,
        err: 'Password must be 8 or more letters, numbers and embedded blanks.',
      },
      email: {
        // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        re: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, // eslint-disable-line max-len
        err: 'Email is invalid.',
        minLen: 8,
        maxLen: 30,
        errLen: 'Email must be 8 or more characters.',
      },
    },
    users: {
      roles: {
        forFirstUser: 'superadmin admin',
        default: '',
      },
    },
  },
};
