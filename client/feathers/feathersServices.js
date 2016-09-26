
// Customise processing in feathers/index.js for your app

// See feathers-reduxify-services::default
export const mapServicePathsToNames = {
  users: 'users',
  messages: 'messages',
  logs: 'logs',
  config: 'config',
  // Do not change the following. Hardcoded path for custom service: human name for further use.
  '/verifyReset/:action/:value': 'verifyReset',
};

// See feathers-reduxify-services::getServicesStatus. Order highest priority msg first.
export const prioritizedListServices = ['auth', 'users', 'verifyReset', 'messages', 'logs'];
