'use strict';

var crypto = require('crypto');

var store = require('./store');

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

function create(username) {
    var sha256 = crypto.createHash('sha256');
    sha256.update(username + uuid(), 'utf8');
    var id = sha256.digest('base64');
    var record = {
        session_id: id
    };
    store.set(username, record);
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