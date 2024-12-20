const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const todoRoutes = require('./routes/todos')
const helloRoutes = require('./routes/hello')
const basicTimerRoutes = require('./routes/basic-timer')
const socketTimerRoutes = require('./routes/socket-timer')
// const desiredRoom = require('./routes/socker-timer')

const { createServer } = require('node:http')
const { join } = require('node:path')
const { Server } = require('socket.io')

const server = createServer(app)
const io = new Server(server)


require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))
// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
  
app.use('/', mainRoutes)
app.use('/todos', todoRoutes)
app.use('/hello', helloRoutes)
app.use('/basic-timer', basicTimerRoutes)
app.use('/socket-timer', socketTimerRoutes)

// app.use('/socket-timer/api', socketTimerRoutes)





// app.get('/socket-timer/api/get-desired-room', (req, res) => {

//   console.log('********** hello world *********')
//   console.log(`this is me accessing the desiredRoom: `, req.currentRoomNameFromJS)

//   // res.json({ desiredRoom: req.desiredRoom })
// })




io.on('connection', socket => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  let desiredRoom = ''



  socket.on('join', async room => {
    socket.join(room)

    desiredRoom = room
    console.log('room: ', room)

    // app.get('/socket-timer/api/get-desired-room', (req, res) => {

    //   console.log(`this is me accessing the desiredRoom: `, 
    //     req.body,
    //     res.body,
    //     req.currentRoomNameFromJS)
    // })

    // app.post('/socket-timer/api/get-desired-room', (req, res) => {

    //   console.log('app.post: ',
    //     req.body,
    //     res.body
    //   )
    // })


    socket.emit('chat message', `* You joined ${room} room *`)
    socket.to(desiredRoom).emit(`chat message`, `* A user has joined ${room} room *` )

    socket.on('chat message', msg => {
      io.emit('chat message', msg)
      console.log(`message: ${msg}`)
    })

    socket.on('chat message room', msg => {
      io.to(`${desiredRoom}`).emit('chat message room', msg)
      console.log(`message room: ${msg}`)
    })
  })

  socket.on('leave', async room => {
    socket.leave(room)
    // socket.emit('chat message', `* Left ${room} room *`)

    // tells 
    socket.to(room).emit(`chat message`, `* A user has left ${room} room *` )
    // tells current user that they have left the room
    socket.emit('chat message', `* You left ${room} room *`)
  })

  // socket.on('chat message', msg => {
  //   io.emit('chat message', msg)
  //   console.log(`message: ${msg}`)
  // })
})
 
server.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}, you better catch it!`)
})    