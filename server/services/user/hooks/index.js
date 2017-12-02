
/* eslint no-console: 0 */
/* global require */

const hooks = require('feathers-hooks-common');
const auth = require('feathers-authentication').hooks;
const verifyHooks = require('feathers-service-verify-reset').hooks;
const validateSchema = require('feathers-hooks-validate-joi');
const config = require('config');

const emailer = require('../../../helpers/emails');
const client = require('../../../../common/helpers/usersClientValidations');
const schemas = require('../../../validations/schemas');
const server = require('../../../validations/usersServerValidations');

const idName = config.database.idName;

exports.before = (app) => {
  const verifyReset = app.service('/verifyReset/:action/:value');
  const users = app.service('/users'); // eslint-disable-line no-unused-vars

  return {
    all: [],
    find: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated(),
      // Only allow admin to list all users
      auth.restrictToRoles({
        roles: ['superAdmin', 'admin'],
        idField: idName,
        owner: false,
      }),
    ],
    get: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated(),
      // Only the owner (user) or admin can get a user
      auth.restrictToRoles({
        roles: ['superAdmin', 'admin'],
        ownerField: idName,
        owner: true,
      }),
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
      // Only the owner (user) or admin can update a user
      auth.restrictToRoles({
        roles: ['superAdmin', 'admin'],
        ownerField: idName,
        owner: true,
      }),
    ],
    patch: [ // client route /user/rolechange patches roles. todo might check its an admin acct
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated(),
      // Only the owner (user) or admin can get a user
      auth.restrictToRoles({
        roles: ['superAdmin', 'admin'],
        ownerField: idName,
        owner: true,
      }),
    ],
    remove: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated(),
      // Only the owner (user) or admin can remove a user
      auth.restrictToRoles({
        roles: ['superAdmin', 'admin'],
        ownerField: idName,
        owner: true,
      }),
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
  const user = clone(hook.result);
  const params = hook.params;

  emailer('send', user, params, (err) => {
    next(err, hook);
  });
}

// Helpers

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
