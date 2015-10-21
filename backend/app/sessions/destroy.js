'use strict';

var store = require('./store');

module.exports = function destroy(req, res) {
    var id = req.params.id;
    if (!(id && store.hasId(id))) {
        return res.status(404).send({
            error: 'SESSION_NOT_FOUND',
            description: 'The session for this request could not be located'
        });
    }
    store.destroyId(id);
    res.status(200).send();
};