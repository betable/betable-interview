'use strict';

var index = require('./index'),
    favoriteGames = require('./favorites'),
    playGame = require('./play-game');

module.exports = function routes(app) {
	app.get('/', index);
    app.get('users/:id/games/favorites', favoriteGames);
    app.post('/games/:id/play', playGame);
};
