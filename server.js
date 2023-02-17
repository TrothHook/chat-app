const dotenv = require('dotenv');
const socketio = require('socket.io');
const server = require('./app');

dotenv.config({ path: '/config/config.env' });

const io = socketio(server);

// When the client connects
io.on('connection', socket => {
  // console.log('New WS Connection');

  //   send messages or events back and forth. Emit a message from the client to the server
  // Welcome message to the current user
  socket.emit('message', 'Welcome to Chat!');

  // Broadcast when a user connects. This will connect to everybody except the user that is connected.
  socket.broadcast.emit('message', 'A user has joined the chat');

  // Runs when a user disconnects
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat');
  });
});

const PORT = process.env.PORT || 2301;

server.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
