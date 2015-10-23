'use strict';

var _ = require('lodash');

var games = require('./data');

var gamesById = _.chain(games)
    .pluck('id')
    .zip(games)
    .object()
    .value();

module.exports = {
    list: games,
    index: gamesById
};