const express = require('express')
const router = express.Router()
const basicTimerController = require('../controllers/basic-timer')
const basicTimer = require('../controllers/basic-timer')

router.get('/basic-timer', basicTimer.getBasicTimer)


module.exports = router