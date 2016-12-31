## feathers-starter-react-redux-login-roles
Production ready starter package.
Local auth, roles; React-Router auth.
Easily use Feathers services with Redux.

> The goal is to support a 100% integration of Feathers and Redux,
within production quality boilerplate,
so you can focus on your app development.
A local auth UI is provided for use,
and as a working example of Feathers + Redux integration.

## <a name="features"></a> Requirements

 - Windows or Linux builds now working
 - Minimum node Version 6.9.0
 - npm versions (3.10.8)

[![Build Status](https://travis-ci.org/eddyystop/feathers-starter-react-redux-login-roles.svg?branch=master)](https://travis-ci.org/eddyystop/feathers-starter-react-redux-login-roles)

## <a name="features"></a> Features

- Designed as a foundation for building commercial applications used in production.
- Local authentication including email verification, forgotten passwords, change email, password, etc.
- Transactional email notifications.
- User roles for authorization, including authorization of React routes.
- UI for user authentication and authorization.
- Feathers DB and custom services are dispatched to Redux for 100% compatibility.
- Async server verification for the UI, as well as client-side verification.
- Share UI verification code between client and server.
- Hierarchical, dynamic app configuration for server and client.
- Logging from both server and client.

## <a name="serverContains"></a> Server contains

- [x] [Feathersjs](https://github.com/feathersjs/feathers) with [Express](https://github.com/expressjs).
- [x] [Feathers-rest](https://github.com/feathersjs/feathers-rest) to implement a REST API.
- [x] [Feathers-socketio](https://github.com/feathersjs/feathers-socketio) for socket.io transport.
- [x] [Feathers-service-verify-reset](https://github.com/eddyystop/feathers-service-verify-reset)
adds email verification, forgotten password reset, etc. to local feathers-authentication.
- [x] [Feathers-hooks-validate-joi](https://github.com/eddyystop/feathers-hooks-validate-joi)
schema validation, sanitization and client notification using
[Joi](https://github.com/hapijs/joi).
- [x] [Dotenv](https://github.com/motdotla/dotenv) loads environment variables from `.env`. (1.8k stars)
- [x] [Envalid](https://github.com/af/envalid) environment variable validation.
- [x] [Node-config](https://github.com/lorenwest/node-config) node.js application configuration.
(1.6k stars)
- [x] [Winston](https://github.com/winstonjs/winston)
a multi-transport async logging library for node.js. (6.1k stars)
- [x] [Morgan](https://github.com/expressjs/morgan)
HTTP request logger middleware for node.js. (1.7k stars)
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

- [x] [React](https://facebook.github.io/react/) & React-dom.
- [x] [Redux](https://github.com/reactjs/redux).
- [x] [Redux-auth-wrapper](https://github.com/mjrussell/redux-auth-wrapper)
for Redux and React-Router permissions. (550 stars)
- [x] [Redux-form](https://github.com/erikras/redux-form)
to manage form state in Redux (version 6). (3.5k stars)
- [x] [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension),
like redux-devtools but perhaps better. (2k stars)
- [x] [Material-ui](https://github.com/callemall/material-ui)
implement Google's Material Design. (19k stars)
- [x] [Feathers-client](https://github.com/feathersjs/feathers-client) using socket.io.
- [x] [Feathers-reduxify-services](https://github.com/eddyystop/feathers-reduxify-services)
wrap Feathers services so they work transparently and perfectly with Redux.
- [x] [Feathers-reduxify-authentication](https://github.com/eddyystop/feathers-reduxify-authentication)
wrap feathers-client.authentication so it works with Redux and React-Router.

## <a name="clientBuildChain"></a> Client build chain contains

- [x] [Webpack](https://webpack.github.io)
- [x] [Babel](https://babeljs.io/)
- [x] [Postcss-modules](https://github.com/css-modules/postcss-modules)
scope CSS names locally, and export a map for rendering React components.
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

`npm install` from root.

#### Linux flavors

With Webpack-dev-server:
- `npm run build:devserver` on one process to start the webpack-dev-server on port 8080.
- `npm run start:devserver` to start the server on port 3030.
- Point browser to `localhost:3030` to start app.

Production build:
- `npm run build`.
- `npm start`.
- Point browser to `localhost:3030` to start app.

#### Windows

Run the above commends using `win:build:...` and `win:start:...`.

User authorization features accessible from icon menus on `/user/signin` and `/app`.

## <a name="faq"></a> [FAQ.](./doc/FAQ.md)

## <a name="customization"></a> [Customization of boilerplate.](./doc/CUSTOMIZATION.md)

## <a name="processExitCodes"></a> [Process Exit Codes.](./doc/PROCESS_EXIT_CODES.md)

## <a name="httpStatusCodes"></a> [HTTP Status Codes.](./doc/HTTP_STATUS_CODES.md)

## <a name="contribution"></a> Contributing

[Contribute to this repo.](./doc/CONTRIBUTING.md)

[Guide to ideomatic contributing.](https://github.com/jonschlinkert/idiomatic-contributing)

## <a name="changeLog"></a> Change Log

[List of notable changes.](./doc/CHANGELOG.md)

## <a name="license"></a> License

MIT. See LICENSE.
