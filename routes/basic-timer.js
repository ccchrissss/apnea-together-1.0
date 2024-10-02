const express = require('express')
const router = express.Router()
const basicTimerController = require('../controllers/basic-timer')
const homeController = require('../controllers/home')

router.get('/', basicTimerController.getBasicTimer)


module.exports = router
