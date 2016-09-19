
const path = require('path');
const debug = require('debug')('app');
const serveStatic = require('feathers').static;
const favicon = require('serve-favicon');
const compress = require('compression');
// const cookieParser = require('cookie-parser');
const cors = require('cors');
const feathers = require('feathers');
const configuration = require('feathers-configuration');
const authentication = require('feathers-authentication');
const hooks = require('feathers-hooks');
const bodyParser = require('body-parser');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');

const logger = require('./utils/loggerProduction');
const middleware = require('./middleware');
const services = require('./services');

const isProduction = process.env.NODE_ENV.indexOf('prod') !== -1;
debug(`set isProduction ${isProduction}`);

const app = feathers();
app.configure(configuration(path.join(__dirname, '..')))
  .options('*', cors())

  // log requests
  .use(logger.setMorgan())

  // general setup
  .use(cors())
  .use(favicon(path.join(app.get('public'), 'favicon.ico')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  // .use(cookieParser())

  // route setup


  .use('/', serveStatic(app.get('public')))
  .use('/app', (req, res) => { // client handles rest of routing
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
  })
  .use('/user', (req, res) => { // client handles rest of routing
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
  })

  // static paths
  .use(serveStatic(path.join(__dirname, 'public')))
  .use(serveStatic(path.join(__dirname, 'public/dist'))) // because of webpack generated HTML
  .use(compress())

  // feathers setup
  .configure(hooks())
  .configure(rest())
  .configure(socketio())
  .configure(services)
  .configure(middleware)
  .configure(authentication);

/*
 .use('/', (req, res, next) => { throw new Error('vvvv'); })

 // error handlers
 if (!isProduction) {
 // development error handler -- will print stacktrace
 app.use((err, req, res) => { // eslint-disable-line no-unused-vars
 logger.verbose(err.message, { tags: 'route' });
 res.status(err.status || 500);
 res.render('error', {
 message: err.message,
 error: err,
 });
 });
 } else {
 // production error handler -- no stacktrace leaked to user
 app.use((err, req, res) => { // eslint-disable-line no-unused-vars
 logger.verbose(err.message, { tags: 'route' });
 res.status(err.status || 500);
 res.render('error', {
 message: err.message,
 error: {},
 });
 });
 }

 */

module.exports = app;
