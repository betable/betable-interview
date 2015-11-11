'use strict'
var _ = require('lodash')
  , express = require('express')
  , sha1 = require('sha1')

  , games = [{
        "id": "2125b5eb-9204-46b5-9cf7-96e0cc12fc97",
        "name": "Forgotten Summer",
        "image": "http://lorempixel.com/600/600/nature/"
    },
    {
        "id": "d369bd4f-713a-4ad8-9c2d-faf4bc590738",
        "name": "Space Battle",
        "image": "http://lorempixel.com/600/600/technics/"
    },
    {
        "id": "0e488cb3-658e-4af6-b7d1-360a9b5d47b0",
        "name": "Rapid Steel",
        "image": "http://lorempixel.com/600/600/transport/"
    },
    {
        "id": "55231631-3e2c-4ee9-bd2c-791f2e65e86a",
        "name": "Blue Panther",
        "image": "http://lorempixel.com/600/600/cats/"
    },
    {
        "id": "93de3918-28cc-43af-98f3-51f03c01f2c6",
        "name": "Olive Star",
        "image": "http://lorempixel.com/600/600/abstract/"
    },
    {
        "id": "80af8787-1709-48e1-bc41-4b85a8e9e334",
        "name": "Ghastly Screwdriver",
        "image": "http://lorempixel.com/600/600/technics/"
    },
    {
        "id": "0f755e8f-69d2-4e18-b081-11a877c7cc86",
        "name": "Maximum Hook",
        "image": "http://lorempixel.com/600/600/technics/"
    },
    {
        "id": "425ee51c-f5cb-4028-8b9f-b63723889805",
        "name": "Third Alarm",
        "image": "http://lorempixel.com/600/600/nightlife/"
    },
    {
        "id": "a5554d77-ad4f-423e-bba2-5d658ff8f89f",
        "name": "Mountain Rainbow",
        "image": "http://lorempixel.com/600/600/nature/"
    },
    {
        "id": "7a2b0ce6-c93e-4066-a25e-fbe6bc858ea1",
        "name": "Electric Boogaloo",
        "image": "http://lorempixel.com/600/600/nightlife/"
    },
    {
        "id": "7a7bfc00-263e-45f3-abe6-23e22b1a13fa",
        "name": "Forgotten Railroad",
        "image": "http://lorempixel.com/600/600/transport/"
    },
    {
        "id": "8a9d398a-6534-43f8-9837-7bcdd773d5cc",
        "name": "Trendy Serious",
        "image": "http://lorempixel.com/600/600/nightlife/"
    },
    {
        "id": "46e6933c-c3fb-4006-8e4c-d850a51310f9",
        "name": "Nonner",
        "image": "http://lorempixel.com/600/600/abstract/"
    },
    {
        "id": "8b46bccc-0922-4b97-9252-a8e832e5ac43",
        "name": "Electric Boogaloo 2",
        "image": "http://lorempixel.com/600/600/city/"
    },
    {
        "id": "ed2553af-6bee-4480-9960-451836073348",
        "name": "Yellow Laser",
        "image": "http://lorempixel.com/600/600/technics/"
    }]
  , sessionData = {}
  , sessionVerification = function (key) {
        return function sessionVerification (req, res, next) {
            var sessionId = _.result(req, key)
            if (!(sessionId && _.result(sessionData, sessionId+'.active'))) {
                console.log('body:',req.body)
                console.log('query:',req.query)
                console.log('key:',key)
                console.log('data:',sessionData)
                return res.status(403).send({
                    error: 'INVALID_SESSION',
                    description: 'The session for this request is missing, or is invalid'
                })
            } else {
                req.session_id = sessionId
            }
            next()
        }
    }
  , querySession = sessionVerification('query.session_id')
  , bodySession = sessionVerification('body.session_id')
  , getSessionData = function (req) {
        return sessionData[req.session_id]
    }

module.exports = function routes() {
    var router = express.Router()
    router.post('/sessions', function login (req, res) {
        var username = req.body.username
        console.log("Creating a session for ["+username+"]")
        if (username) {
            var sessionId = sha1(username)
            sessionData[sessionId] = sessionData[sessionId] || {username:username, favorites:[]}
            sessionData[sessionId].active = true

            res.status(200).send({
                sessionId: sessionId
              , username: username
            })
        } else {
            return res.status(400).send({
                error: 'NO_USERNAME',
                description: 'You must provide a username to login'
            })
        }

    })
    router.delete('/sessions/:sessionId', function login (req, res) {
        var session = getSessionData(req)
        if (session) {
            session.active = false
        }
        return res.status(200).send({})
    })
    router.get('/', function listGames (req, res) {
        res.status(200).send({
            games: games
        })
    })
    router.get('/suggested', querySession, function suggested(req, res) {
        console.log("Suggesting Games")
        var suggestedGames = getSessionData(req).suggested
        if (!suggestedGames || !suggestedGames.length) {
            suggestedGames = _.sample(games, 5)
            console.log("    Creating new sample")
            getSessionData(req).suggested = suggestedGames
        }
        res.status(200).send({
            games: suggestedGames
        })
    })
    router.get('/favorites', querySession, function suggested(req, res) {
        console.log("Favorites")
        res.status(200).send({
            games: getSessionData(req).favorites
        })
    })
    router.get('/recently_played', querySession, function suggested(req, res) {
        console.log("Recently Played")
        var recentlyPlayedGames = (getSessionData(req).recentlyPlayed || []).slice(0,5)
        res.status(200).send({
            games: recentlyPlayedGames
        })
    })
    router.post('/plays/:id', bodySession, function play (req, res) {
        var gameId = req.params.id
          , game = _.find(games, 'id', gameId)
          , session = getSessionData(req)
          , recentlyPlayed = session.recentlyPlayed = session.recentlyPlayed || []
        console.log("Playing game ["+gameId+"]")

        if (!game) {
            return res.status(404).send({
                error: 'GAME_NOT_FOUND'
              , description: 'The game for this request could not be located'
            })
        } else {
            var session = getSessionData(req)
            recentlyPlayed.unshift(game)
            session.recentlyPlayed = _.uniq(session.recentlyPlayed, 'id')

            res.status(200).send({'status': 'success'})
        }
    })
    router.put('/favorites/:id', bodySession, function favorite (req, res) {
        var gameId = req.params.id
          , game = _.find(games, 'id', gameId)
          , session = getSessionData(req)
          , favorites = session.favorites = session.favorites || []

        console.log("Favoriting game ["+gameId+"]")
        if (!game) {
            return res.status(404).send({
                error: 'GAME_NOT_FOUND'
              , description: 'The game for this request could not be located'
            })
        } else {
            favorites.unshift(game)
            session.favorites = _.uniq(favorites, 'id')
            res.status(200).send({'status': 'success'})
        }
        console.log("Session:",session)
        console.log("Session Data:", sessionData)

    })
    router.delete('/favorites/:id', querySession, function unfavorite (req, res) {
        var gameId = req.params.id
          , game = _.find(games, 'id', gameId)
          , favorites = getSessionData(req).favorites

        console.log("Unfavoriting game ["+gameId+"]")
        if (!game) {
            return res.status(404).send({
                error: 'GAME_NOT_FOUND'
              , description: 'The game for this request could not be located'
            })
        } else if (favorites) {
            _.remove(favorites, 'id', gameId)
            res.status(200).send({'status': 'success'})
        }

    })
    return router
}
