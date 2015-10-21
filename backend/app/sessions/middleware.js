'use strict';

var _ = require('lodash');

var store = require('./store');

var middleware = module.exports = {};
middleware.sessionVerification = function generate (requestPath) {
    return function sessionVerification (req, res, next) {
        var sessionId = _.result(req, requestPath);
        if (!(sessionId && store.hasId(sessionId))) {
            return res.status(403).send({
                error: 'INVALID_SESSION',
                description: 'The session for this request is missing, or is invalid'
            });
        }
        next();
    }
}