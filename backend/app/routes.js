'use strict';

var dummy = require('./dummy')

module.exports = function routes(app) {
    app.use('', dummy());
};
