/* eslint-disable no-undef */
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get username and room from URL
const { username, room } = Qs.parse(window.location.search, {
  ignoreQueryPrefix: true
});

const socket = io();

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const para = document.createElement('p');
  para.classList.add('meta');
  para.innerText = username;
  const timeString12hr = new Date().toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: 'numeric'
  });
  para.innerHTML += ` <span>${timeString12hr}</span>`;
  div.appendChild(para);
  const para1 = document.createElement('p');
  para1.classList.add('text');
  para1.innerText = message;
  div.appendChild(para1);
  // div.innerHTML = `<p class="meta">Barun <span>4:30pm</span></p>
  // <p class="text">${message}</p>`;
  document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message from server. Catch the message event emitted from the server
socket.on('message', message => {
  outputMessage(message);

  // Scroll down: automatically scrolls down to the latest message
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', e => {
  // when we submit a form it automatically submits to a file. To prevent that from happening
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // Emit message to server
  socket.emit('chatMessage', msg);

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});
