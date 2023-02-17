# chat-app

## Use HTTP Module
-Here we need to use HTTP module since we will use socketIO

### Note
-socket.emit(): emits to a single user
-socket.broadcast.emit(): emits to all the users except the user that is connected
-io.emit(): emits to all the users
---
-'.on()' is used to catch the emitted events.