'use strict';

var express = require('express');

var sessionVerification = require('../sessions/middleware').sessionVerification,
    querySession = sessionVerification('query.session_id'),
    bodySession = sessionVerification('body.session_id');

var list = require('./list'),
    suggested = require('./suggested'),
    play = require('./play');

module.exports = function routes() {
    var router = express.Router();
    router.get('/', querySession, list);
    router.get('/suggested', querySession, suggested);
    router.post('/:id/play', bodySession, play);
    return router;
};