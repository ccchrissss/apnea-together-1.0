const socket = io()

const messagesForm = document.querySelector('#messages-form');
const messagesInput = document.querySelector('#messages-input');
const messages = document.querySelector('#messages-ul')

const roomJoinForm = document.querySelector('#room-join-form')
const roomJoinInput = document.querySelector('#room-join-input')
let currentRoomName = document.querySelector('#current-room-name')
let leaveCurrentRoom = document.querySelector('#leave-current-room')


messagesForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (messagesInput.value) {
    socket.emit('chat message', messagesInput.value);
    messagesInput.value = '';
  }
});

roomJoinForm.addEventListener('submit', e => {
  e.preventDefault()

  socket.emit('join', `${roomJoinInput.value}`)
  console.log(`${roomJoinInput.value}`)

  messagesForm.classList.remove('messages-form-hide')
  messagesForm.classList.add('messages-form-show')

  if (roomJoinInput.value) {
    currentRoomName.innerText = roomJoinInput.value
  }
})

leaveCurrentRoom.addEventListener('click', () => {
  socket.emit('leave', `${currentRoomName.innerText}`)

  messagesForm.classList.remove('messages-form-show')
  messagesForm.classList.add('messages-form-hide')

  currentRoomName.innerText = ''
})


socket.on('chat message', msg => {
  const item = document.createElement('li')
  item.textContent = msg
  messages.appendChild(item)
  window.scrollTo(0, document.body.scrollHeight)
})

