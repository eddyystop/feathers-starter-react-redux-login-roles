
const path = require('path');

module.exports = {
  server: {
    host: 'localhost',
    port: '3030',
  },
  auth: {
    token: {
      secret: '1234567890',
    },
    local: {},
  },
  authEmails: {
    providers: {
      postmark: {
        fromEmail: 'jszwaronek@universal.com', // must be verified with postmarkapp.com
        postmarkApiToken: '00917934-dbe7-4883-bedc-12b93fc4c7c5', // our account token
      },
    },
  },
};
