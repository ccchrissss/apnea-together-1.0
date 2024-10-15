const { createServer } = require('node:http')
const { Server } = require('socket.io')
const ioc = require('socket.io-client')

function waitFor(socket, event) {
  return new Promise( (resolve) => {
    socket.once(event, resolve)
  })
}

describe('apnea-together-1.0', () => {
  let io, serverSocket, clientSocket

  beforeAll( (done) => {
    const httpServer = createServer()

    io = new Server(httpServer)

    httpServer.listen( () => {
      const port = httpServer.address().port

      clientSocket = ioc(`http://localhost:${port}`)

      io.on('connection', socket => {
        serverSocket = socket
      })

      clientSocket.on('connect', done)
    })
  })

  afterAll( () => {
    io.close()

    clientSocket.disconnect()
  })

  test('should work', done => {
    clientSocket.on('hello', arg => {
      expect(arg).toBe('world')

      done()
    })

    serverSocket.emit('hello', 'world')
  })

  test(`should join room 'chillroom'`, done => {
    clientSocket.on('join', arg => {
      expect(arg).toBe('chillroom')

      done()
    })

    serverSocket.emit('join', 'chillroom')
  })

})


// socket.on('join', async room => {
//   socket.join(room)

//   desiredRoom = room
//   console.log('room: ', room)


//   socket.emit('chat message', `* Joined ${room} room *`)