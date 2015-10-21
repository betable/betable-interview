'use strict';

var store = require('./store');

function responseData(username, id) {
    return {
        session_id: id,
        user_name: username
    };
}

module.exports = function endpoint(req, res) {
    var username = req.body.user_name;
    if (!username) {
        return res.status(400).send({error: 'Username required'});
    }
    var id = store.setOrGetId(username);
    res.status(201).send(responseData(username, id));
};