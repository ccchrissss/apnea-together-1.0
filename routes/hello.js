const express = require('express')
const router = express.Router()
const helloController = require('../controllers/hello')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', helloController.getHello)


module.exports = router