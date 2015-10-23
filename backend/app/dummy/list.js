'use strict';

var games = require('./store').list;

module.exports = function listGames (req, res) {
    res.status(200).send({
        games: games
    });
};