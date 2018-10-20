
/* eslint max-len: 0, no-console: 0 */

const debug = require('debug')('emails');
const email = require('config').authEmails;

debug('Required');

const sendEmail = (...lines) => {
  for (const line of lines) {
    console.log(line);
  }
};

module.exports = function (action, user, params, cb) {
  debug(`Send email type ${action}`);

  switch (action) {
    case 'send':
      console.log('-- Sending email to verify new user\'s email addr');
      sendEmail(`Dear ${user.username}, please click this link to verify your email addr.`,
                `  ${email.subs.productUrl}/user/verify/${user.verifyToken}`,
                `  This email is valid for the next ${email.expires.signUpEmailTokenTimeValidText}.`);
      return cb(null);
    case 'resend':
      console.log(`-- Resending email to ${user.email} to verify new user's email addr`);
      sendEmail(`Dear ${user.username}, please click this link to verify your email addr.`,
                `  ${email.subs.productUrl}/user/verify/${user.verifyToken}`,
                `  This email is valid for the next ${email.expires.signUpEmailTokenTimeValidText}.`);
      return cb(null);
    case 'verify':
      console.log(`-- Sending email to ${user.email} to confirm they are verified.`);
      sendEmail(`Dear ${user.username}, your email has been verified at ${email.subs.productName}.`,
                `  You can sign in at ${email.subs.productUrl}.`);
      return cb(null);
    case 'forgot':
      console.log(`-- Resending email to ${user.email} to reset password`);
      sendEmail(`Dear ${user.username}, please click this link to reset your password.`,
                `  ${email.subs.productUrl}/user/forgot/${user.resetToken}`,
                `  This email is valid for the next ${email.expires.forgotPasswordEmailTokenTimeValidText}.`);
      return cb(null);
    case 'reset':
      console.log(`-- Sending email to ${user.email} to notify them of password change.`);
      sendEmail(`Dear ${user.username}, your password at ${email.subs.productName} has been changed`,
                '  by password reset.',
                `  Please contact us at ${email.subs.supportEmail} if you did not initiate this change.`,
                `  You can sign in at ${email.subs.productUrl}.`);
      return cb(null);
    case 'password':
      console.log(`-- Sending email to ${user.email} to notify them of password change.`);
      sendEmail(`Dear ${user.username}, your password at ${email.subs.productName} has been changed manually.`,
                `  Please contact us at ${email.subs.supportEmail} if you did not initiate this change.`,
                `  You can sign in at ${email.subs.productUrl}.`);
      return cb(null);
    case 'email':
      console.log(`-- Sending email to ${user.email} to notify them of email change.`);
      sendEmail(`Dear ${user.username}, your email address at ${email.subs.productName} is being`,
                `  changed from this address to ${user.newEmail}.`,
                `  Please contact us at ${email.subs.supportEmail} if you did not initiate this change.`,
                `  You can sign in at ${email.subs.productUrl}.`);
      return cb(null);
    default:
      return cb(null);
  }
};
