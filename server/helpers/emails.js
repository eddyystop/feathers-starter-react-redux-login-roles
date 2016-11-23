
/* eslint max-len: 0, no-console: 0 */

const debug = require('debug')('emails');
const email = require('config').authEmails;

debug('Required');

module.exports = function (action, user, params, cb) {
  debug(`Send email type ${action}`);

  switch (action) {
    case 'send':
      console.log('-- Sending email to verify new user\'s email addr');
      console.log(`Dear ${user.username}, please click this link to verify your email addr.`);
      console.log(`  http://localhost:3030/user/verify/${user.verifyToken}`);
      console.log(`  This email is valid for the next ${email.expires.signUpEmailTokenTimeValidText}.`);
      return cb(null);
    case 'resend':
      console.log(`-- Resending email to ${user.email} to verify new user's email addr`);
      console.log(`Dear ${user.username}, please click this link to verify your email addr.`);
      console.log(`  http://localhost:3030/user/verify/${user.verifyToken}`);
      console.log(`  This email is valid for the next ${email.expires.signUpEmailTokenTimeValidText}.`);
      return cb(null);
    case 'verify':
      console.log(`-- Sending email to ${user.email} to confirm they are verified.`);
      console.log(`Dear ${user.username}, your email has been verified at ${email.subs.productName}.`);
      console.log(`  You can sign in at ${email.subs.productUrl}.`);
      return cb(null);
    case 'forgot':
      console.log(`-- Resending email to ${user.email} to reset password`);
      console.log(`Dear ${user.username}, please click this link to reset your password.`);
      console.log(`  http://localhost:3030/user/forgot/${user.resetToken}`);
      console.log(`  This email is valid for the next ${email.expires.forgotPasswordEmailTokenTimeValidText}.`);
      return cb(null);
    case 'reset':
      console.log(`-- Sending email to ${user.email} to notify them of password change.`);
      console.log(`Dear ${user.username}, your password at ${email.subs.productName} has been changed`);
      console.log('  by password rest.');
      console.log(`  Please contact us at ${email.subs.supportEmail} if you did not initiate this change.`);
      console.log(`  You can sign in at ${email.subs.productUrl}.`);
      return cb(null);
    case 'password':
      console.log(`-- Sending email to ${user.email} to notify them of password change.`);
      console.log(`Dear ${user.username}, your password at ${email.subs.productName} has been changed manually.`);
      console.log(`  Please contact us at ${email.subs.supportEmail} if you did not initiate this change.`);
      console.log(`  You can sign in at ${email.subs.productUrl}.`);
      return cb(null);
    case 'email':
      console.log(`-- Sending email to ${user.email} to notify them of email change.`);
      console.log(`Dear ${user.username}, your email address at ${email.subs.productName} is being`);
      console.log(`  changed from this address to ${user.newEmail}.`);
      console.log(`  Please contact us at ${email.subs.supportEmail} if you did not initiate this change.`);
      console.log(`  You can sign in at ${email.subs.productUrl}.`);
      return cb(null);
    default:
      return cb(null);
  }
};
