
/*
 A basic middleware logger
 See http://redux.js.org/docs/advanced/Middleware.html
 */

const logger = store => next => action => {
  console.groupCollapsed(action.type); // eslint-disable-line no-console
  console.info('dispatching', action); // eslint-disable-line no-console
  const result = next(action);
  console.log('next state', store.getState()); // eslint-disable-line no-console
  console.groupEnd(action.type); // eslint-disable-line no-console
  return result;
};

export default logger;
