const dotenv = require('dotenv');
const socketio = require('socket.io');
const server = require('./app');

const formatMessage = require('./utils/messages');
const users = require('./utils/users');

dotenv.config({ path: '/config/config.env' });

const io = socketio(server);

// When the client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    // console.log(socket);

    const user = users.userJoin(socket.id, username, room);

    socket.join(user.room);

    //   send messages or events back and forth. Emit a message from the client to the server
    // Welcome message to the current user
    socket.emit('message', formatMessage(username, 'Welcome to Chat!'));

    // Broadcast when a user connects. This will connect to everybody except the user that is connected.
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(username, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: users.getRoomUsers(user.room)
    });
  });

  // Listen for chat message
  socket.on('chatMessage', msg => {
    const user = users.getCurrentUser(socket.id);
    // console.log(msg);
    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // Runs when a user disconnects
  socket.on('disconnect', () => {
    const user = users.userLeave(socket.id);
    if (user)
      io.to(user.room).emit(
        'message',
        formatMessage(user.username, `${user.username} has left the chat`)
      );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: users.getRoomUsers(user.room)
    });
  });
});

const PORT = process.env.PORT || 2301;

server.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
