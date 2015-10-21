'use strict';

var _ = require('lodash');

var data = {};

function destroy(key) {
    var prev = data[key];
    if (!has(key)) {
        return undefined;
    }
    data = _.omit(data, key);
    return prev;
}

function get(key) {
    return data[key];
}

function has(key) {
    return _.has(data, key);
}

function set(key, val) {
    var prev = data[key];
    data[key] = val;
    return prev;
}

module.exports = {
    destroy: destroy,
    get: get,
    has: has,
    set: set
};