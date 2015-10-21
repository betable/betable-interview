'use strict';

var request = require('request');

var config = require('../../config');

module.exports = function play (req, res) {
    var gameId = req.params.id,
        sessionId = req.body.session_id;

    request.post('http://localhost:' + config.PORT + '/hook', {
        event: 'play',
        data: {
            game: gameId
        },
        session_id: sessionId
    }, function() {
        res.status(200).send({status: 'played'});
    })
};