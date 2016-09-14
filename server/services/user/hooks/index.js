
/* eslint no-console: 0 */
/* global require */

const hooks = require('feathers-hooks-common');
const auth = require('feathers-authentication').hooks;
const verifyHooks = require('feathers-service-verify-reset').hooks;

const client = require('../../../../common/helpers/usersClientValidations');
const schemas = require('../../../validations/schemas');
const server = require('../../../validations/usersServerValidations');

const validateSchema = require('feathers-hooks-validate-joi');

exports.before = (app) => {
  const verifyReset = app.service('/verifyReset/:action/:value');
  const users = app.service('/users'); // eslint-disable-line no-unused-vars

  return {
    all: [],
    find: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated(),
    ],
    get: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated(),
      auth.restrictToOwner({ ownerField: '_id' }),
    ],
    create: [
      validateSchema.form(schemas.signup, schemas.options), // schema validation
      hooks.validateSync(client.signup),  // redo redux-form client validation
      hooks.validateUsingPromise(values => verifyReset.create( // redo redux-form async
        { action: 'unique', value: { username: values.username, email: values.email } }
      )),
      hooks.validateUsingCallback(server.signup, { app }), // server validation
      hooks.remove('confirmPassword'),
      verifyHooks.addVerification(), // set email addr verification info
      auth.hashPassword(),
    ],
    update: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated(),
      auth.restrictToOwner({ ownerField: '_id' }),
    ],
    patch: [ // client route /user/rolechange patches roles. might check its an admin acct
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated(),
    ],
    remove: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated(),
      auth.restrictToOwner({ ownerField: '_id' }),
    ],
  };
};

exports.after = {
  find: [
    hooks.remove('password'),
    verifyHooks.removeVerification(),
  ],
  get: [
    hooks.remove('password'),
    verifyHooks.removeVerification(),
  ],
  create: [
    hooks.remove('password'),
    emailVerification, // send email to verify the email addr
    verifyHooks.removeVerification(),
  ],
  update: [
    hooks.remove('password'),
    verifyHooks.removeVerification(),
  ],
  patch: [
    hooks.remove('password'),
    verifyHooks.removeVerification(),
  ],
  remove: [
    hooks.remove('password'),
    verifyHooks.removeVerification(),
  ],
};

function emailVerification(hook, next) {
  const user = hook.result;

  console.log('-- Sending email to verify new user\'s email addr');
  console.log(`Dear ${user.username}, please click this link to verify your email addr.`);
  console.log(`  http://localhost:3030/user/verify/${user.verifyToken}`);

  next(null, hook);
}
