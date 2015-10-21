'use strict';

var _ = require('lodash');

// http://stackoverflow.com/a/21963136
var uuid = (function() {
  var lut = new Array(256);
  for (var i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }
  return function generate() {
    var d0 = Math.random()*0xffffffff|0;
    var d1 = Math.random()*0xffffffff|0;
    var d2 = Math.random()*0xffffffff|0;
    var d3 = Math.random()*0xffffffff|0;
    return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
      lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
      lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
      lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
  };
})();

var usernames = {};
var ids = {};

function hasId(id) {
    return _.has(ids, id);
}

function destroyId(id) {
    if (hasId(id)) {
        return undefined;
    }
    var prev = ids[id];
    usernames = _.omit(usernames, prev);
    ids = _.invert(usernames);
    return prev;
}

function setOrGetId(username) {
    if (_.has(usernames, username)) {
        return usernames[username];
    }
    var id = uuid();
    usernames = _.extend({}, usernames, _.object([[username, id]]));
    ids = _.invert(usernames);
    console.log(usernames, ids);
    return id;
}

module.exports = {
    setOrGetId: setOrGetId,
    hasId: hasId,
    destroyId: destroyId
};