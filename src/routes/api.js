const express = require('express')
const router = express.Router()
const  userController = require('../controller/UsersController')
const todoController = require('../controller/TodoController')
const AuthVerifyMiddleware = require('../middleware/AuthVerifyMiddleware')

//User Api Start
router.post('/registraion', userController.Registraion)
router.get('/login', userController.Login)
router.post('/user-profile-update',AuthVerifyMiddleware, userController.UpdateProfile)
//User Api End

//Todo Api Start
router.post('/create-todo',AuthVerifyMiddleware, todoController.CreateTodo)
router.get('/update-todo-status/:id/:status',AuthVerifyMiddleware, todoController.UpdateTodoStatus)
router.get('/delete-todo/:id',AuthVerifyMiddleware, todoController.DeleteTodo)
//Todo Api End
module.exports = router