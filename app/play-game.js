'use strict';

var request = require('request');

module.exports = function(req, res) {
    var id = req.params.id;
    request.post('http://localhost:3000/webhooks', {
        object: 'game',
        id: id,
        action: 'play'
    }, function(err, response, body) {
        res.send(200, {status: 'played'});
    })
};