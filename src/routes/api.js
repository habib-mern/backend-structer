const express = require('express')
const router = express.Router()
const  userController = require('../controller/UsersController')
const AuthVerifyMiddleware = require('../middleware/AuthVerifyMiddleware')

router.post('/registraion', userController.Registraion)
router.get('/login', userController.Login)
router.post('/user-profile-update',AuthVerifyMiddleware, userController.UpdateProfile)

module.exports = router