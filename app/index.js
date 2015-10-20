'use strict';

var path = require('path');

var root = path.join(__dirname, '..');

module.exports = function index(req, res) {
	res.sendFile(path.join(root, 'templates', 'index.html'));
};
