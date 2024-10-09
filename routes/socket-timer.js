const express = require('express')
const router = express.Router()
const socketTimerController = require('../controllers/socket-timer')
const homeController = require('../controllers/home')

router.get('/', socketTimerController.getSocketTimer)
// router.post('/data', socketTimerController.receiveData)

router.post('/api/get-desired-room', socketTimerController.receiveDesiredRoom)



module.exports = router
