
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
        fromEmail: '...@....com', // must be verified with postmarkapp.com
        postmarkApiToken: '00917934-dbe7-4883-bedc-12b93fc4c7c59', // our account token
      },
    },
  },
};
