
const path = require('path');
const serveStatic = require('feathers').static;
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const feathers = require('feathers');
const configuration = require('feathers-configuration');
const authentication = require('feathers-authentication');
const hooks = require('feathers-hooks');
const bodyParser = require('body-parser');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');
const middleware = require('./middleware');
const services = require('./services');

const app = feathers();

app.configure(configuration(path.join(__dirname, '..')));

app.use(compress())
  .options('*', cors())
  .use((req, res, next) => {
    console.log(req.url, req.method, req.originalUrl); // eslint-disable-line no-console
    next();
  })
  .use(cors())
  .use(favicon(path.join(app.get('public'), 'favicon.ico')))
  .use('/', serveStatic(app.get('public')))
  .use('/app', (req, res) => { // client handles rest of routing
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
  })
  .use('/user', (req, res) => { // client handles rest of routing
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
  })
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(hooks())
  .configure(rest())
  .configure(socketio())
  .configure(services)
  .configure(middleware)
  .configure(authentication);

module.exports = app;
