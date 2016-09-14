
/* global window */

/*
 Initialize the npm module 'debug' for use on either node or the browser.

 Coding:
   import debugClient from 'utils/debugClient';  // eslint-disable-line import/no-unresolved
   const debug = debugClient('namespace name');
   debug('some debug message');
 or
   const debug = require('utils/debugClient)('namespace name');
   debug('some debug message');

 You enable display of debug statements on Node for some namespaces by starting Node with:
   DEBUG=a*,-ab* node server.js
 This displays for namespaces starting with a* but skipping ones starting with ab* .

 You enable display of debug statements on the  browser for some namespaces by typing
 the following on the browser console:
   Debug.enable('a*,-ab*')
 You can disable tracing with:
   Debug.disable()

 Any changes to the namespaces being traced are effective ONLY ON THE NEXT PAGE REFRESH.
 (As an aside, debug makes use of localStorage.)

 Warning: window.debug is a builtin function on the browser. Be careful when shadowing it with
 a debug scoped to the module.
 */

const debug = require('debug');

try {
  window.Debug = debug; // install Debug.enable and .disable
} catch (err) {} // eslint-disable-line no-empty

module.exports = debug;
