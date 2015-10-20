'use strict';

var index = require('./index'),
    userGames = require('./user-games'),
    playGame = require('./play-game');

module.exports = function routes(app) {
	app.get('/', index);
    app.get('/games/suggested', userGames.suggested);
    app.post('/games/:id/play', playGame);
};
