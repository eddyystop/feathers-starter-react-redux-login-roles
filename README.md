## feathers-starter-react-redux-login-roles
Starter package with comprehensive local authentication and roles, plus React-Router authorization.
Easily use Feathers services with Redux.

[![Build Status](https://travis-ci.org/eddyystop/feathers-starter-react-redux-login-roles.svg?branch=master)](https://travis-ci.org/eddyystop/feathers-starter-react-redux-login-roles)

> Added production code. Working now on docs.

## Features

- Designed as a foundation for building commercial applications.
- Local authentication including email verification, forgotten passwords, change email, password, etc.
- Transactional email notifications.
- User roles for authorization, including authorization of React routes.
- UI for user authentication and authorization.
- Feathers DB and custom services dispatch to Redux for 100% compatibility.
- Async server verification for the UI, as well as client-side verification.
- Share UI verification code between client and server.

## Server contains

- [x] [Feathersjs](https://github.com/feathersjs/feathers) with [Express](https://github.com/expressjs)
- [x] [Feathers-socketio](https://github.com/feathersjs/feathers-socketio) for socket.io transport
- [x] [Feathers-rest](https://github.com/feathersjs/feathers-rest) for HTTP transport
- [x] [Feathers-service-verify-reset](https://github.com/eddyystop/feathers-service-verify-reset)
- [x] [Feathers-hooks-validate-joi](https://github.com/eddyystop/feathers-hooks-validate-joi)
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

## Client contains

- [x] [React](https://facebook.github.io/react/) & React-dom
- [x] [Redux](https://github.com/reactjs/redux)
- [x] [Redux-auth-wrapper](https://github.com/mjrussell/redux-auth-wrapper)
- [x] [Redux-form](https://github.com/erikras/redux-form)
- [x] [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)
- [x] [Material-ui](https://github.com/callemall/material-ui)
- [x] [Feathers-client](https://github.com/feathersjs/feathers-client) using socket.io
- [x] [Feathers-reduxify-services](https://github.com/eddyystop/feathers-reduxify-services)
- [x] [Feathers-reduxify-authentication](https://github.com/eddyystop/feathers-reduxify-authentication)

## Client build contains

- [x] [Webpack](https://webpack.github.io)
- [x] [Babel](https://babeljs.io/)

## Motivation

A complete, working project on which you can build your own Feathers, React, Redux app.

The project contains comprehensive local authentication and authorization including user roles.

## <a name="running"></a> Running the starter package

`npm start` to start the server on port 3030.

`npm run build:devserver` to start the webpack dev-server on port 8080.

Point browser to `localhost:3030` to start app.

User authorization features accessible from icon menus on `/user/signin` and `/app`. 

## <a name="todo"></a> To do

- Docs on how to configure the package.
- Doc on what files do what.
- Enhance webpack.config.js to production.
- Cleanup package.json scripts & for production.
- Production build.

## <a name="contribution"></a> Contributing

[Contribute to this repo.](./CONTRIBUTING.md)

[Guide to ideomatic contributing.](https://github.com/jonschlinkert/idiomatic-contributing)

## <a name="changeLog"></a> Change Log

[List of notable changes.](./CHANGELOG.md)

## <a name="license"></a> License

MIT. See LICENSE.
