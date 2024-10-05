const socket = io()

const messagesForm = document.querySelector('#messages-form');
const messagesInput = document.querySelector('#messages-input');
const messages = document.querySelector('#messages-ul')

const roomJoinForm = document.querySelector('#room-join-form')
const roomJoinInput = document.querySelector('#room-join-input')
let currentRoomName = document.querySelector('#current-room-name')


messagesForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (messagesInput.value) {
    socket.emit('chat message', messagesInput.value);
    messagesInput.value = '';
  }
});

roomJoinForm.addEventListener('submit', e => {
  e.preventDefault()

  if (roomJoinInput.value) {
    currentRoomName.innerText = roomJoinInput.value
  }
})


socket.on('chat message', msg => {
  const item = document.createElement('li')
  item.textContent = msg
  messages.appendChild(item)
  window.scrollTo(0, document.body.scrollHeight)
})

