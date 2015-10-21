'use strict';

var express = require('express');

var sessionVerification = require('../sessions/middleware').sessionVerification,
    suggested = require('./suggested'),
    play = require('./play');

module.exports = function routes() {
    var router = express.Router();
    router.get('/suggested', sessionVerification('query.session_id'), suggested);
    router.post('/:id/play', sessionVerification('body.session_id'), play);
    return router;
};