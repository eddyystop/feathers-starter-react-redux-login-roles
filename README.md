## feathers-starter-react-redux-login-roles
Starter package with comprehensive local authentication and roles, plus React-Router authorization.
Easily use Feathers services with Redux.

[![Build Status](https://travis-ci.org/eddyystop/feathers-starter-react-redux-login-roles.svg?branch=master)](https://travis-ci.org/eddyystop/feathers-starter-react-redux-login-roles)

> In progress. This should be working. Changes are being made to harden it for production.

## <a name="features"></a> Features

- Designed as a foundation for building commercial applications.
- Local authentication including email verification, forgotten passwords, change email, password, etc.
- Transactional email notifications.
- User roles for authorization, including authorization of React routes.
- UI for user authentication and authorization.
- Feathers DB and custom services dispatch to Redux for 100% compatibility.
- Async server verification for the UI, as well as client-side verification.
- Share UI verification code between client and server.

## <a name="serverContains"></a> Server contains

- [x] [Feathersjs](https://github.com/feathersjs/feathers) with [Express](https://github.com/expressjs)
- [x] [Feathers-socketio](https://github.com/feathersjs/feathers-socketio) for socket.io transport
- [x] [Feathers-rest](https://github.com/feathersjs/feathers-rest) for HTTP transport
- [x] [Feathers-service-verify-reset](https://github.com/eddyystop/feathers-service-verify-reset)
- [x] [Feathers-hooks-validate-joi](https://github.com/eddyystop/feathers-hooks-validate-joi)
- [x] [Dotenv](https://github.com/motdotla/dotenv) Loads environment variables from .env. (1.8k stars)
- [x] [Envalid](https://github.com/af/envalid) Environment variable validation
- [x] [Node-config](https://github.com/lorenwest/node-config) node.js application configuration.
(1.6k stars)
- [x] [Winston](https://github.com/winstonjs/winston)
a multi-transport async logging library for node.js (6.1k stars)
- [x] [Morgan](https://github.com/expressjs/morgan)
HTTP request logger middleware for node.js (1.7k stars)
- [x] [Feathers-nedb](https://github.com/feathersjs/feathers-nedb).
You can cleanly and easily [swap databases](http://docs.feathersjs.com/databases/readme.html).

You can swap to one or more of these databases with minor code changes:
Amazon DynamoDB,
Apache Cassandra,
ArangoDB,
Azure Table Storage,
Google Sheets
GraphQL,
LevelDB,
MariaDB,
MondoDB,
MySQL,
NeDB,
Neo4j,
SQLite,
Oracle,
OrientDB,
PostgrSQL,
Redis,
RethinkDB,
Riak,
SQL Server,

## <a name="ClientContains"></a> Client contains

- [x] [React](https://facebook.github.io/react/) & React-dom
- [x] [Redux](https://github.com/reactjs/redux)
- [x] [Redux-auth-wrapper](https://github.com/mjrussell/redux-auth-wrapper)
for Redux and React-Router permissions. (550 stars)
- [x] [Redux-form](https://github.com/erikras/redux-form)
to manage form state in Redux (version 6). (3.5k stars)
- [x] [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension),
like gaearon/redux-devtools but better. (2k stars)
- [x] [Material-ui](https://github.com/callemall/material-ui)
implement Google's Material Design. (19k stars)
- [x] [Feathers-client](https://github.com/feathersjs/feathers-client) using socket.io
- [x] [Feathers-reduxify-services](https://github.com/eddyystop/feathers-reduxify-services)
- [x] [Feathers-reduxify-authentication](https://github.com/eddyystop/feathers-reduxify-authentication)

## <a name="clientBuildChain"></a> Client build chain contains

- [x] [Webpack](https://webpack.github.io)
- [x] [Babel](https://babeljs.io/)
- [x] [Postcss-modules](https://github.com/css-modules/postcss-modules)
scope CSS names locally, export a map for rendering React components.
(css-modules 4.7k stars)
- [x] [Autoprefixer](https://github.com/postcss/autoprefixer)
add vendor prefixes. (10.7k stars)
- [x] [Rucksack](https://github.com/simplaio/rucksack)
a little bag of CSS superpowers, built on PostCSS. (1.5k stars)
- [x] [Html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin)
simplifies creation of HTML files to serve your webpack bundles. (1.7k stars)

## <a name="motivation"></a> Motivation

A complete, working project on which you can build your own Feathers, React, Redux app.

The project contains comprehensive local authentication and authorization including user roles.

## <a name="running"></a> Running the starter package

With Webpack-dev-server:
`npm run build:devserver` on one process to start the webpack-dev-server on port 8080.
`npm run start:devserver` to start the server on port 3030.
Point browser to `localhost:3030` to start app.

Production build:
`npm run build`.
`npm start`.
Point browser to `localhost:3030` to start app.

User authorization features accessible from icon menus on `/user/signin` and `/app`.

## <a name="gettingStarted"></a> [Getting Started.](./doc/GETTING_STARTED.md)

## <a name="processExitCodes"></a> [Process Exit Codes.](./doc/PROCESS_EXIT_CODES.md)

## <a name="faq"></a> [FAQ.](./doc/FAQ.md)

## <a name="todo"></a> To Do

- Docs on how to configure the package.
- Doc on what files do what.
- DONE. Enhance webpack.config.js to production.
- Cleanup package.json scripts & for production.
- DONE. Production build.

## <a name="contribution"></a> Contributing

[Contribute to this repo.](./doc/CONTRIBUTING.md)

[Guide to ideomatic contributing.](https://github.com/jonschlinkert/idiomatic-contributing)

## <a name="changeLog"></a> Change Log

[List of notable changes.](./doc/CHANGELOG.md)

## <a name="license"></a> License

MIT. See LICENSE.
