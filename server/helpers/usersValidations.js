
/* eslint newline-per-chained-call: 0 */

const Joi = require('joi');
const debug = require('debug')('usersValidation');
const clientValidations = require('../../common/helpers/usersClientValidations');

// Schemas

const username = Joi.string().trim().alphanum().min(1).max(30).required(); // todo 1 => 5
const password = Joi.string().trim().regex(/^[\sa-zA-Z0-9]+$/, 'letters, numbers, spaces')
  .min(1).max(30).required(); // todo *** 1 => 8
const email = Joi.string().trim().email().required();

const schemas = {};

schemas.signup = Joi.object().keys({
  name: Joi.string().trim().min(1).max(30).required(), // todo 1 -> 8
  username,
  password,
  confirmPassword: password.label('Confirm password'),
  email,
});
schemas.validateFields = Joi.object().keys({ username, email });
schemas.signin = Joi.object().keys({ username, password });
schemas.sendForgotPasswordEmail = Joi.object().keys({ email });
schemas.validateForgotPasswordEmail = Joi.object().keys({
  password,
  confirmPassword: password.label('Confirm password'),
});
schemas.changePassword = Joi.object().keys({
  oldPassword: password.label('Present password'),
  password: password.label('New password'),
  confirmPassword: password.label('Confirm password'),
});
schemas.changeEmail = Joi.object().keys({ password, email });

// Schema validation

const schemaValidation = (schemaName, values, cb) => {
  Joi.validate(values, schemas[schemaName],
    {
      convert: true,
      allowUnknown: false,
      stripUnknown: true,
    },
    (joiErr, convertedValues) => {
      cb(convertJoiDetailsToFormErrors(joiErr, false), convertedValues);
    }
  );
};

// Server custom validations

const serverValidations = {};

serverValidations.signup = (values, params, cb) => {
  const errors = {};
  var isNotUnique; // eslint-disable-line no-unused-vars, no-var
/*
  isNotUnique = params.users.some((user) => (user.username === values.username));
  if (isNotUnique) {
    errors.username = 'Username not available.';
  }
*/
  /* todo ***
  isNotUnique = params.users.some((user) => (user.email === values.email));
  if (isNotUnique) {
    errors.email = 'This email address is used by another account.';
  }
  */

  cb((Object.keys(errors).length === 0 ? null : errors), values);
};

serverValidations.validateFields = serverValidations.signup;

// Schema + client + server custom validation

const validation = (apiName, values, params, cb) => {
  schemaValidation(apiName, values, (formErrors, convertedValues) => {
    if (formErrors) {
      debug('schema validation errors %o', formErrors);
      cb(formErrors);
      return;
    }

    if (!clientValidations[apiName]) {
      doServerValidations(null, convertedValues);
      return;
    }

    clientValidations[apiName](convertedValues, params, doServerValidations);
  });

  function doServerValidations(formErrors, values1) {
    if (formErrors) {
      debug('client validation errors %o', formErrors);
      cb(formErrors);
      return;
    }

    if (!serverValidations[apiName]) {
      cb(null, values1);
      return;
    }

    serverValidations[apiName](values1, params, (serverErrors, values2) => {
      if (serverErrors) {
        debug('server validation errors %o', serverErrors);
      }
      cb(serverErrors, values2);
    });
  }
};

// Exports

module.exports = {
  validation,
  schemas,
  serverValidations,
};

// Helpers

function convertJoiDetailsToFormErrors(joiErr, ifOverrideMsg) {
  if (!joiErr || !joiErr.details) {
    return null;
  }

  return (
    joiErr.details.reduce((acc, detail) => (
      Object.assign(acc,
        { [detail.path]: ifOverrideMsg ? `${detail.context.key} is badly formed.` : detail.message }
      )
    ), {})
  );
}
