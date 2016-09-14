
module.exports = {
  env: {
    ifNode: typeof window === 'undefined',
  },
  client: {
    defaultRoute: '/app',
  },
  users: {
    roles: {
      // used in server/validations/usersServerValidations.js
      forFirstUser: 'superAdmin admin',
      default: '',
      // used in client/index.js
      allowedToChangeRoles: ['superAdmin', 'admin'],
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
