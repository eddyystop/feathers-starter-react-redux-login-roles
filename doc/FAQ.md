
## <a name="reduxFormVer"></a> Are you using the latest version of
[Redux-form](https://github.com/erikras/redux-form)?

Redux-form was rewritten for v6 to be faster on large forms.
There is no incremental upgrade path from v5.
You need not worry as everything here is v6, the lastest and greatest.

## <a name="reactRouterVer"></a> Why are you not using the latest version of React-router>
 
The amount of churn is React-router is [well known](https://news.ycombinator.com/item?id=12511419).
React-route v4 is a rewrite and the churn may well be even higher than normal.

We have decided to remain on v3 for now, which will continue to be maintained,
because as developers writing practical software, we need some project stability.

## <a name="reduxDevTool"></a> Why you not using
[Redux DevTools](https://github.com/gaearon/redux-devtools)?

We were happy enough with Redux DevTools in the past, but we feel the new
[Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)
is a superior product if you use Chrome, Firefox or Electron for development.

- Redux-devtools-extension resides in the browser, not in your client bundle.
- The integration requires just 1 line of JS code in your app. It does bloat your client bundle.
- Its UI is external to your app UI.
You don't have to import and render Redux-devtools-dock-monitor and Redux-devtools-log-monitor.
- You can use it for debugging even with production builds!
- You can use [Redux DevTools](https://github.com/gaearon/redux-devtools) are a fallback,
but not both simultaneously.
- You can use it with isomorphic (universal) apps.
- You can use it with React Native, hybrid, desktop and server side Redux apps.

You can change `client/store.js` and `client/router/index.js` to use
[Redux DevTools](https://github.com/gaearon/redux-devtools)
if you want to.

## <a name="reduxDevToolMsg"></a> Why does
`Download the React DevTools for a better development experience:` appear on the console?

You did not choose to use Redux DevTools in `client/store/index.js`.
You may be using Redux DevTools Extension, which is this project's default.

In any case this message is just an informatory message and no cause for concern.

## <a name="reactHotLoader"></a> Why have you not included
[React Hot Loader](https://github.com/gaearon/react-hot-loader)?

We've used React Hot Loader.
Its author says it
[has problems](https://medium.com/@dan_abramov/the-death-of-react-hot-loader-765fa791d7c4#.er68udy3b)
and his
[React Transform Boilerplate](https://github.com/gaearon/react-transform-boilerplate)
should be used instead.
However that project has been _deprecated_.

React Hot Loader v3 is on the horizon and will fix some long-standing issues with both.
So we are waiting on on it.

_There may already be commented out code to include React Hot Loader._ Include your own if not.

## <a name="webpackChunks"></a> Why do my Webpack chunks change hash values when no code changes?

Webpack cannot produce chunks with a stable chunk-hash as of June 2016.
The problem revolves around Webpack assigning numeric ids to modules.
A new module, or any change in module discovery order, can change subsequent ids,
and hence the 'code' for a chunk whose contents have not themselves changed.
At present there seem to be 2 fragile routes to try and avoid this problem,
but they don't work much of the time.
So we aren't implementing them.

More info:
- See Jan 15 posting in https://github.com/webpack/webpack/issues/1315
- See https://github.com/kevinrenskers/chunkhash-problem/commit/3969b5ac2233a933fe35b1338106cc13fd7caddb
(but it turns out CSS changes will still change the hash.)
- See NamedModulesPlugin option also.

One of the main uses of a chunk is to contain infrequently changed code.
The browser should then retrieve that chunk from its cache
instead of making a network request to the server.
Webpack at the moment cannot accomplish this.
Expect all the chunks to be requested when any code or CSS changes.

Chunks are still useful for dynamically loaded code.
The app can load infrequently used chunks only when they are needed.
It saves initial parsing time and may make the first page appear faster.

Webpack is undergoing a rewrite and this will hopefully be fixed.

## <a name="logsJson"></a> Why do the log entries contain JSON?

So they are easier to parse when you search them.

## <a name="designModules"></a> What were the criteria for module separation?

- Structure the modules the way React, Redux documentation structures them.
- Separate code you are unlikley to change from code you will have to customize for your app.

## <a name="debug"></a> How do you enable `debug` logging?

An environment variable is used to enable the `debug` logs based on space or comma-delimited names.
- On the server you use the DEBUG environment variable `DEBUG=verify* npm start`.
- On the client run `localStorage.debug = 'reducer*,verify*';`
on the console and then restart the client.

## <a name="logging"></a> Tell me about the logger?

The logger uses [Winston](https://github.com/winstonjs/winston) and
[Morgan](https://github.com/expressjs/morgan).
It logs to both the log file and the console in production mode, the console only in development.
You can control the severity of the entries logged with LOG_LEVEL and LOG_CONSOLE_LEVEL.

You can configure the logger in `server/utils/loggerProduction.js`.

Note that the logger is set up before the environment variables are validated and sanitized.
NODE_ENV must contain the char fragment 'prod' for production mode.

## <a name="configHow"></a> [How is the application configuration determined](../CONFIG_README.md)?

## <a name="config"></a> Tell me about the configuration values.

## <a name="start"></a> How do you start the server?

- `cd .../feathers-starter-react-redux-login-roles` & `npm start, or
- `.../feathers-starter-react-redux-login-roles/server/bin/www.js`

## <a name="npmVersions"></a> How can I tell if the most current `npm` packages are being used?

- Install the package `npm install -g npm-check-updates`.
- Run `npm-check-updates` or `npm run npm:updates` while in project root.
