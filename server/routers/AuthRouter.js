const express = require('express')
const router = express.Router()
const authController = require('../controller/AuthController')
const validatorRegister = require('../util/validator')
const verifyToken = require('../util/verifyToken')

/* 
@Router POST api/auth/
@des check auth user
@access Public
*/
router.get('/', verifyToken, authController.checkAuth)

/* 
@Router POST api/auth/register 
@des register users
@access Public
*/
router.post('/register', validatorRegister, authController.register)

/* 
@Router POST api/auth/login
@des login users
@access Public
*/
router.post('/login', authController.login)

/* 
@Router POST api/auth/verifyuser
@des verify users
@access Public
*/
router.post('/verifyuser/:userId', authController.verifyUser)

/* 
@Router GET api/auth/changepassword
@des verify users
@access Public
*/
router.get('/changepassword/:email', authController.reset)

/* 
@Router POST api/auth/updatenewpasswork
@des verify users
@access Public
*/
router.post('/updatenewpasswork', authController.changePassword)

/* 
@Router GET api/auth/notify
@des notify user
@access admin
*/
router.post('/notify', verifyToken, authController.notifyUser)

module.exports = router
