'use strict';

var _ = require('lodash');

var games = require('./store');

module.exports = function suggested(req, res) {
    res.status(200).send({
        games: _.sample(games.list, 5)
    });
};