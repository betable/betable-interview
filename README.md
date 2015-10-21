# betable-interview
A starting point for the betable pair programming interview


##Services Available

You will have two services that are available to you.

###Sessions Service

**`POST /sessions`**

When you call this endpoint with a username it returns a JSON representation of a session for that user, the session will look like this

```json
{
  "session_id": UNIQUE_SESSION_ID,
  "user_name": USER_NAME
}
```

If you make a request for a user that already has a session available it will return for you the same session.

**Sessions do not persist on a reset of the service**

###Games Service

**`GET /games/suggested?session=<session_id>`**

When you call this endpoint, if the session is active, it will return a list of suggested games for the user. It will look like this:

```json
{
  "games": [
    GAME_OBJECT, ...
  ]
}
```

A `GAME_OBJECT` looks like this:

```json
200
{
  "id": GAME_ID
  "name": GAME_NAME,
  "image": GAME_IMAGE
}
```

If the user is not signed in you will get an error

```json
403
{
  "error": "INVALID_SESSION",
  "description: "The session for this request is missing, or is invalid"
}
```

**Web Hook**

The games service will make requests to your service through a "webhook". It's not truly a webhook because we will predefine the path that it will call. The request will be made to your service and will look like this:

`POST /hook/play`

The body of that request will be JSON and will look like this:

```json
{
  "game_id": GAME_ID,
  "session_id": SESSION_ID
}
```


