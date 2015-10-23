'use strict';
var express, logger, expressBunyanLogger, bodyParser, app, server, config,
routes;

express = require('express');
logger = require('./utils/logger')('Server', true);
expressBunyanLogger = require('express-bunyan-logger');
bodyParser = require('body-parser');
config = require('./config');

routes = require('./app/routes');

app = module.exports = express();

// Some much needed middleware.
app.use(expressBunyanLogger.errorLogger());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

routes(app);

app.set('port', config.PORT);

// Start up and initialize the server.
server = app.listen(app.get('port'), '0.0.0.0', 511, function serverListen() {
    logger.info('Server started and listening on port ' + server.address().port);
});
