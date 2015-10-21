'use strict';

var store = require('./store');

module.exports = function destroy(req, res) {
    var id = req.params.id;
    if (!id) {
        return res.status(400).send({error: 'Session ID required'});
    }
    store.destroyId(id);
    res.status(200).send();
};