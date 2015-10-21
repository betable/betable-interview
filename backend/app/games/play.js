'use strict';

var request = require('request');

var config = require('../../config'),
    games = require('./store');

module.exports = function play (req, res) {
    var gameId = req.params.id,
        sessionId = req.body.session_id;

    if (!games.index[gameId]) {
        return res.status(404).send({
            error: 'INVALID_GAME',
            description: 'The game for this request is missing, or is invalid'
        });
    }

    request.post('http://localhost:' + config.PORT + '/hook', {
        event: 'play',
        data: {
            game: gameId
        },
        session_id: sessionId
    }, function() {
        res.status(200).send({success: true});
    })
};