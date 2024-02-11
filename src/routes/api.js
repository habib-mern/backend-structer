const express = require('express')
const router = express.Router()
const testController = require('../controller/testController')

router.get('/test', testController.test)

module.exports = router