var express = require('express');

var suggested = require('./suggested'),
    play = require('./play');

module.exports = function routes() {
    var router = express.Router();
    router.get('/suggested', suggested);
    router.post('/:id/play', play);
    return router;
};