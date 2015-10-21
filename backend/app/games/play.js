'use strict';

var request = require('request');

module.exports = function play (req, res) {
    var gameId = req.params.id,
        sessionId = req.body.session_id;

    request.post('http://localhost:3000/hook', {
        event: 'play',
        data: {
            game: gameId
        },
        session_id: sessionId
    }, function() {
        res.status(200).send({status: 'played'});
    })
};