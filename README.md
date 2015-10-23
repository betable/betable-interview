# betable-interview
A starting point for the betable pair programming interview

## Backend

You will have two (simulated) services that are available to you. The server for these services runs on port 3000.

###Sessions Service

**`POST /sessions`**

When you call this endpoint with a username it returns a JSON representation of a session for that user.

The request body should be a JSON-encoded payload that looks like this:

```
{
  "user_name": USER_NAME
}
```

The session object you receive will look like this:

```
{
  "session_id": UNIQUE_SESSION_ID,
  "user_name": USER_NAME
}
```

Session IDs are guaranteed to be URI encoded.

If you make a request for a user that already has a session available it will return for you the same session.

**`DELETE /sessions/<session_id>`**

When you call this endpoint with a session ID it destroys a session with that ID. The response body will be empty.

If the session ID is not found you will get an error:

```
404
{
  "error": "SESSION_NOT_FOUND",
  "description: "The session for this request could not be located"
}
```

**Sessions do not persist on a reset of the service**

###Games Service

The endpoints for this service deal in `GAME_OBJECT`s. A `GAME_OBJECT` looks like this:

```
{
  "id": GAME_ID
  "name": GAME_NAME,
  "image": GAME_IMAGE
}
```

**`GET /games?session=<session_id>`**

When you call this endpoint, if the session is active, it will return a list of all games.

If the user is not signed in you will get an error:

```
403
{
  "error": "INVALID_SESSION",
  "description: "The session for this request is missing, or is invalid"
}
```

**`GET /games/suggested?session=<session_id>`**

When you call this endpoint, if the session is active, it will return a list of suggested games for the user. It will look like this:

```
200
{
  "games": [
    GAME_OBJECT, ...
  ]
}
```

If the user is not signed in you will get an error:

```
403
{
  "error": "INVALID_SESSION",
  "description: "The session for this request is missing, or is invalid"
}
```

**`POST /games/<game_id>/play`**

This expects a JSON payload that looks like this:

```
{
  "session_id": SESSION_ID
}
```

When you call this endpoint, if the session is active, it will trigger a webhook to your service (see below).

If the user is not signed in you will get an error:

```
403
{
  "error": "INVALID_SESSION",
  "description: "The session for this request is missing, or is invalid"
}
```

If the game is not found you will get an error:

```
404
{
  "error": "GAME_NOT_FOUND",
  "description: "The game for this request could not be located"
}
```

## Frontend

Your frontend should run on port 4000.

**Web Hook**

The games service will make requests to your service through a "webhook". It's not truly a webhook because we will predefine the path that it will call. The request will be made to your service and will look like this:

`POST /hook`

The body of that request will be JSON and will look like this:

```
{
  "event": "play",
  "data": {
    "game":GAME_ID
  },
  "session_id": SESSION_ID
}
```
