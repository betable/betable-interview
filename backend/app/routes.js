'use strict';

var games = require('./games'),
    sessions = require('./sessions');

module.exports = function routes(app) {
    app.use('/games', games());
    app.use('/sessions', sessions());
};
