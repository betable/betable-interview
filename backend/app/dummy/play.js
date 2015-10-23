'use strict';

var request = require('request');

var config = require('../../config'),
    games = require('./store');

module.exports = function play (req, res) {
    var gameId = req.params.id,
        sessionId = req.body.session_id;

    if (!games.index[gameId]) {
        return res.status(404).send({
            error: 'GAME_NOT_FOUND',
            description: 'The game for this request could not be located'
        });
    }

    request.post('http://localhost:' + config.FRONTEND_PORT + '/hook', {
        event: 'play',
        data: {
            game: gameId
        },
        session_id: sessionId
    }, function() {
        res.status(200).send({success: true});
    })
};