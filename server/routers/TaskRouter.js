const express = require('express')
const router = express.Router()
const taskController = require('../controller/TaskController')
const verifyToken = require('../util/verifyToken')

/* 
@Router POST api/task/create
@des create task
@access user
*/
router.post('/create', verifyToken, taskController.createTask)

/* 
@Router POST api/task/update/:id
@des update task
@access user
*/
router.post('/update/:id', verifyToken, taskController.updateTask)

/* 
@Router POST api/task
@des get all task
@access user
*/
router.get('/', verifyToken, taskController.getAllTask)

/* 
@Router POST api/task/delete/:id
@des delete task
@access user
*/
router.delete('/delete/:id', verifyToken, taskController.deleteTask)

module.exports = router
