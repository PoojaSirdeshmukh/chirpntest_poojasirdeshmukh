const express = require('express');

const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const _ = require('underscore');
global.appRoot = path.resolve(__dirname);


//Declear global variables
if (!global._) {
  global._ = _;
}
if (!global.MESSAGE)
  global.MESSAGE = require('./constants/messages.js');

if (!global.STATUS_CODE)
  global.STATUS_CODE = require('./constants/statusCode.js');

if (!global.RESPONSE)
  global.RESPONSE = require('./helper/response.js');

var config = require('./config/config.js');
var db = require('./config/databaseConnection.js');

var envConfig = config.environmentConfig();

var routes = require('./routes/index');
var userRoutes = require('./routes/users');
var productRouter = require('./routes/product');

var port = envConfig.port;
var app = express();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: '50mb', extended: true }));
// parse application/json
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});


app.get('/*', function (req, res, next) {
  console.log(req.method, "->", req.headers.host)
  next();
});
app.use('/', routes);
app.use('/api/users/', userRoutes);
app.use('/product', productRouter);

var server = app.listen(process.env.PORT || port, function () {
  console.log('server runnig on port:', port);
  db.connectToMongo();
});

server.on('listening', function () {
  console.log('ok, server is running');
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.send(RESPONSE.sendResponse(false, false, {}, err, STATUS_CODE.INTERNAL_SERVER_ERROR))
});

module.exports = app;