const dotenv = require('dotenv');
const socketio = require('socket.io');
const server = require('./app');

const formatMessage = require('./utils/messages');

dotenv.config({ path: '/config/config.env' });

const io = socketio(server);

const botName = 'admin';

// When the client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    // console.log(socket);

    //   send messages or events back and forth. Emit a message from the client to the server
    // Welcome message to the current user
    socket.emit('message', formatMessage(username, 'Welcome to Chat!'));

    // Broadcast when a user connects. This will connect to everybody except the user that is connected.
    socket.broadcast.emit(
      'message',
      formatMessage(username, ' user has joined the chat')
    );
  });

  // Listen for chat message
  socket.on('chatMessage', msg => {
    // console.log(msg);
    io.emit('message', formatMessage('USER', msg));
  });

  // Runs when a user disconnects
  socket.on('disconnect', () => {
    io.emit('message', formatMessage(botName, 'A user has left the chat'));
  });
});

const PORT = process.env.PORT || 2301;

server.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
