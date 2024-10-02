const express = require('express')
const router = express.Router()
const socketTimerController = require('../controllers/socket-timer')
const homeController = require('../controllers/home')

router.get('/', socketTimerController.getSocketTimer)


module.exports = router
