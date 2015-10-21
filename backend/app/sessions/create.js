'use strict';

var crypto = require('crypto');

var store = require('./store');

function create(username) {
    var sha256 = crypto.createHash('sha256');
    sha256.update(username, 'utf8');
    var id = sha256.digest('base64');
    var record = {
        user_name: username
    };
    store.set(id, record);
    return id;
}

module.exports = function endpoint(req, res) {
    var username = req.body.user_name;
    if (!username) {
        return res.status(400).send({error: 'Username required'});
    }
    if (store.has(username)) {
        return res.status(200).send(store.get(username));
    }

    var id = create(username);
    res.status(201).send({
        session_id: id,
        user_name: username
    });
};