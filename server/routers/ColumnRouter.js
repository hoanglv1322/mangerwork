const express = require('express')
const router = express.Router()
const columnController = require('../controller/ColumnController')
const verifyToken = require('../util/verifyToken')

/* 
@Router POST api/column/create/:tableId
@des create column
@access user
*/
router.post('/create/:tableId', verifyToken, columnController.createColumn)

/* 
@Router POST api/column/update/:id
@des update column
@access user
*/
router.post('/update/:id', verifyToken, columnController.updateColumn)

/* 
@Router POST api/column
@des get all column
@access user
*/
router.get('/', verifyToken, columnController.getAllColumn)

/* 
@Router POST api/column/delete/:id
@des delete column
@access user
*/
router.delete('/delete/:id', verifyToken, columnController.deleteColumn)

module.exports = router
