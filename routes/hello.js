const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
const helloController = require('../controllers/hello')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', helloController.getHello)
// router.get('/', homeController.getIndex)


module.exports = router