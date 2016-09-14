
const rolesConfig = require('../../config/config').users.roles;

module.exports = {
  signup: (data, { app }, cb) => {
    const users = app.service('/users');
    const formErrors = {};
    const sanitized = {};

    Object.keys(data).forEach(key => {
      sanitized[key] = clean(data[key]);
    });

    // make first user created a super admin
    users.find({ query: { $limit: 1 } }, (err, result) => {
      if (err) {
        return cb(err);
      }

      if (!sanitized.roles) {
        sanitized.roles = !Array.isArray(result) && result.total === 0
          ? rolesConfig.forFirstUser // first user created
          : rolesConfig.default; // not first user
      }

      return cb(cbErr(formErrors), sanitized);
    });
  },
};

// Helpers

function clean(str) {
  return (str || '').trim();
}

function cbErr(errors) {
  return Object.keys(errors).length > 0 ? errors : null;
}
