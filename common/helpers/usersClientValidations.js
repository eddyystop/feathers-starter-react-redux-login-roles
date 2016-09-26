
/* eslint no-param-reassign: 0, no-var: 0 */

var auth = {};

/**
 * Validations to perform on client. (Also performed on server.)
 *
 * These functions are compatible with redux-form:
 *   export default reduxForm({
 *     form: '...',
 *     fields: [...],
 *     validate: usersClientValidations.signin,
 *   }, mapStateToProps, mapDispatchToProps)(...);
 *
 * These validations are in a different module from the Joi and server validations
 * so that the client can use these without being forced to import Joi.
 *
 * .setClientValidationsConfig(config) must be called with either the server or client config
 * before any validations may be performed.
 */

const clientValidations = {};

clientValidations.setClientValidationsConfig = (config) => {
  auth = config.validation.auth;
};

clientValidations.signup = (values /* , props */) => {
  const errors = {};

  checkName(values.name, errors);
  checkUsername(values.username, errors);
  checkEmail(values.email, errors);
  checkPassword(values.password, errors);
  checkConfirmPassword(values.password, values.confirmPassword, errors);

  return errors;
};

clientValidations.profileChange = (values /* , props */) => {
  const errors = {};

  checkName(values.name, errors);
  checkUsername(values.username, errors);

  return errors;
};

clientValidations.signin = (values /* , props */) => {
  const errors = {};

  checkEmail1(values.email, errors);
  checkPassword1(values.password, errors);

  return errors;
};

clientValidations.signUpSendEmail = (values /* , props */) => {
  const errors = {};

  checkEmail1(values.email, errors);

  return errors;
};

clientValidations.forgotPwdSendEmail = (values /* , props */) => {
  const errors = {};

  checkEmail1(values.email, errors);

  return errors;
};

clientValidations.forgotPwdReset = (values /* , props */) => {
  const errors = {};

  checkPassword(values.password, errors);
  checkConfirmPassword(values.password, values.confirmPassword, errors);

  return errors;
};

clientValidations.changePassword = (values /* , props */) => {
  const errors = {};
  const password = clean(values.password);
  const oldPassword = clean(values.oldPassword);

  checkPassword1(oldPassword, errors, 'oldPassword');
  checkPassword(password, errors);
  checkConfirmPassword(password, values.confirmPassword, errors);

  if (oldPassword === password && !errors.password) {
    errors.password = 'New password must be different from the current one.';
  }

  return errors;
};

clientValidations.changeEmail = (values /* , props */) => {
  const errors = {};
  const email = clean(values.email);

  checkPassword1(values.password, errors);
  checkEmail(email, errors);
  checkConfirmEmail(email, clean(values.confirmEmail), errors);

  return errors;
};

module.exports = clientValidations;

// Helpers

function clean(str) {
  return (str || '').trim();
}

function checkName(name, errors, fieldName = 'name') {
  if (!new RegExp(auth.name.re).test(clean(name))) {
    errors[fieldName] = auth.name.err;
  }
}

function checkUsername(username, errors, fieldName = 'username') {
  if (!new RegExp(auth.username.re).test(clean(username))) {
    errors[fieldName] = auth.username.err;
  }
}

function checkEmail(email, errors, fieldName = 'email') {
  const authEmail = auth.email;
  email = clean(email);

  if (email.length < authEmail.minLen || email.length > authEmail.maxLen) {
    errors[fieldName] = authEmail.errLen;
  } else if (!new RegExp(authEmail.re).test(email)) {
    errors[fieldName] = authEmail.err;
  }
}

function checkEmail1(email, errors, fieldName = 'email') {
  if (!clean(email)) {
    errors[fieldName] = 'Enter email.';
  }
}

function checkConfirmEmail(email, confirmEmail, errors, fieldName = 'confirmEmail') {
  if (clean(email) !== clean(confirmEmail)) {
    errors[fieldName] = 'Confirm email must match email.';
  }
}

function checkPassword(password, errors, fieldName = 'password') {
  if (!new RegExp(auth.password.re).test(clean(password))) {
    errors[fieldName] = auth.password.err;
  }
}

function checkPassword1(password, errors, fieldName = 'password') {
  if (!clean(password)) {
    errors[fieldName] = 'Enter password.';
  }
}

function checkConfirmPassword(password, confirmPassword, errors, fieldName = 'confirmPassword') {
  if (clean(password) !== clean(confirmPassword)) {
    errors[fieldName] = 'Confirm password must match password.';
  }
}
