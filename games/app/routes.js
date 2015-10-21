'use strict';

var express = require('express');

var suggested = require('./suggested'),
    play = require('./play');

function games() {
    var router = express.Router();
    router.get('/suggested', suggested);
    router.post('/:id/play', play);
    return router;
}

module.exports = function routes(app) {
    app.use('/games', games());
};
