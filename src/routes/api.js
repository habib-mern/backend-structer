const express = require('express')
const router = express.Router()
const  userController = require('../controller/UsersController')
const todoController = require('../controller/TodoController')
const AuthVerifyMiddleware = require('../middleware/AuthVerifyMiddleware')

//User Api Start
router.post('/registraion', userController.Registraion)
router.get('/login', userController.Login)
router.post('/user-profile-update',AuthVerifyMiddleware, userController.UpdateProfile)
router.get('/profile-info',AuthVerifyMiddleware, userController.ProfileInfo)
//OTP Api
router.post('/email-verify/:email', userController.EmailVerify)
router.get('/otp-verify/:email/:otp', userController.OtpVerify)
router.post('/reset-password', userController.ResetPassword)

//User Api End

//Todo Api Start
router.post('/create-todo',AuthVerifyMiddleware, todoController.CreateTodo)
router.get('/update-todo-status/:id/:status',AuthVerifyMiddleware, todoController.UpdateTodoStatus)
router.get('/delete-todo/:id',AuthVerifyMiddleware, todoController.DeleteTodo)
router.get('/todo-list-by-status/:status',AuthVerifyMiddleware, todoController.TodoListByStatus)
router.get('/todo-count-by-statu/',AuthVerifyMiddleware, todoController.TodoCountByStatus)
//Todo Api End


module.exports = router