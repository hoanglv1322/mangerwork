const express = require('express')
const router = express.Router()
const messagerController = require('../controller/MessagerController')
const verifyToken = require('../util/verifyToken')

/* 
@Router POST api/messager/create
@des create messager
@access user
*/
router.post('/create', verifyToken, messagerController.createMessager)

/* 
@Router POST api/messager/update/:id
@des update messager
@access user
*/
router.post('/update/:id', verifyToken, messagerController.updateMessager)

/* 
@Router POST api/messager
@des get all messager
@access user
*/
router.get('/', verifyToken, messagerController.getAllMessager)

/* 
@Router POST api/messager/delete/:id
@des delete messager
@access user
*/
router.delete('/delete/:id', verifyToken, messagerController.deleteMessager)

module.exports = router
