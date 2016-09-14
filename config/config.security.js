
/*
 This file should never be uploaded to an open source repository, e.g. github.
 File config.securityTemplate.js should be uploaded for the open source user to configure.
 */

const sec = 1000;
const min = sec * 60;
const hr = min * 60;

const email = {
  // email from address. must be verified with postmarkapp.com
  fromEmail: 'jszwaronek@universal.com',
  // our account token from postmarkapp.com
  postmarkApiToken: '00917934-dbe7-4883-bedc-12b93fc4c7c5',
  // values for templates
  productName: '[feathers-starter-redux-login]',
  senderName: '[Feathers Starter]',
  productAddressLine1: '[Feathers Starter <feathers-starter@feathersjs.com>]',
  productAddressLine2: '[http://feathersjs.com]',
};

const emailSecurity = {
  signUpEmailTokenTimeValid: 24 * hr,
  signUpEmailTokenTimeValidText: '24 hours',
  forgotPasswordEmailTokenTimeValid: 30 * min,
  forgotPasswordEmailTokenTimeValidText: '30 minutes',
};


module.exports = {
  email,
  emailSecurity,
};
