
/* global module, require */
/* eslint newline-per-chained-call: 0 */

const Joi = require('joi');
const debug = require('debug')('validation:schema'); // eslint-disable-line no-unused-vars

debug('Required');

const username = Joi.string().trim().alphanum().min(5).max(30).required();
const password = Joi.string().trim().regex(/^[\sa-zA-Z0-9]+$/, 'letters, numbers, spaces')
  .min(8).max(30).required();
const email = Joi.string().trim().email().required();

module.exports = {
  options: { abortEarly: false, convert: true, allowUnknown: false, stripUnknown: true },
  signup: Joi.object().keys({
    name: Joi.string().trim().min(8).max(30).required(),
    username,
    password,
    confirmPassword: password.label('Confirm password'),
    email,
  }),
  validateFields: Joi.object().keys({ username, email }),
  signin: Joi.object().keys({ username, password }),
  sendForgotPasswordEmail: Joi.object().keys({ email }),
  validateForgotPasswordEmail: Joi.object().keys({
    password,
    confirmPassword: password.label('Confirm password'),
  }),
  changePassword: Joi.object().keys({
    oldPassword: password.label('Present password'),
    password: password.label('New password'),
    confirmPassword: password.label('Confirm password'),
  }),
  changeEmail: Joi.object().keys({ password, email }),
};

debug('Schemas defined');
