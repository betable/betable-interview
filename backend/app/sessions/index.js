'use strict';

var express = require('express');

var create = require('./create'),
    destroy = require('./destroy');

module.exports = function routes() {
    var router = express.Router();
    router.post('/', create);
    router.delete('/:id', destroy);
    return router;
};