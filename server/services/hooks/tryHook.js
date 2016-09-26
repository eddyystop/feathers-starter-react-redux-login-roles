
/* eslint consistent-return: 0 */

/**
 * Run a hook. If the hook fails, its like it never ran.
 * You would typically use this to wrap already available hooks e.g. auth.verifyToken().
 *
 * @param {Function} hookFunc - the hook to run.
 *
 * Example - if the request is from an authenticated user, place his user info in hook.params.user.
 * before: {
 *   create: [
 *     tryHook(auth.verifyToken()),
 *     tryHook(auth.populateUser()),
 * ]}
 */
module.exports = (hookFunc) => (hook) => new Promise(resolve => {
  new Promise(resolve1 => {
    const result = hookFunc(hook);

    if (!result || typeof result.then !== 'function') {
      return resolve1(result);
    }

    result.then(hook1 => resolve1(hook1));
  })
    .then(hook1a => resolve(hook1a))
    .catch(() => resolve(hook));
});
