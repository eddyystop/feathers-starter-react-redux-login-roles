
/* eslint no-console: 0, quotes: 0 */

const verifyReset = require('feathers-service-verify-reset').service;
const configSecurity = require('../../../config/config.security');

const email = configSecurity.email;

module.exports = function () { // 'function' needed as we use 'this'
  const app = this;

  app.configure(verifyReset({ emailer }));
};

// Helpers

function emailer(action, user, params, cb) {
  switch (action) {
    case 'resend':
      console.log(`-- Resending email to ${user.email} to verify new user\'s email addr`);
      console.log(`Dear ${user.username}, please click this link to verify your email addr.`);
      console.log(`  http://localhost:3030/user/verify/${user.verifyToken}`);
      return cb(null);
    case 'verify':
      console.log(`-- Sending email to ${user.email} to confirm they are verified.`);
      console.log(`Dear ${user.username}, your email has been verified at ${email.productName}.`);
      console.log(`  You can sign in at ${email.productAddressLine2}.`);
      return cb(null);
    case 'forgot':
      console.log(`-- Resending email to ${user.email} to reset password`);
      console.log(`Dear ${user.username}, please click this link to reset your password.`);
      console.log(`  http://localhost:3030/user/forgot/${user.resetToken}`);
      return cb(null);
    case 'reset':
      console.log(`-- Sending email to ${user.email} to notify them of password change.`);
      console.log(`Dear ${user.username}, your password at ${email.productName} has been changed`);
      console.log(`  by password rest. Please contact us if you did not initiate this change.`);
      console.log(`  You can sign in at ${email.productAddressLine2}.`);
      return cb(null);
    case 'password':
      console.log(`-- Sending email to ${user.email} to notify them of password change.`);
      console.log(`Dear ${user.username}, your password at ${email.productName} has been changed`);
      console.log(`  manually. Please contact us if you did not initiate this change.`);
      console.log(`  You can sign in at ${email.productAddressLine2}.`);
      return cb(null);
    case 'email':
      console.log(`-- Sending email to ${user.email} to notify them of email change.`);
      console.log(`Dear ${user.username}, your email address at ${email.productName} is being`);
      console.log(`  changed from this address to ${email.newEmail}.`);
      console.log(`  Please contact us if you did not initiate this change.`);
      console.log(`  You can sign in at ${email.productAddressLine2}.`);
      return cb(null);
    default:
      return cb(null);
  }
}
