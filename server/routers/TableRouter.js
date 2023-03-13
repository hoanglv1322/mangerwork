const express = require('express')
const router = express.Router()
const tableController = require('../controller/TableController')
const verifyToken = require('../util/verifyToken')

/* 
@Router POST api/table/create
@des create table
@access user
*/
router.post('/create', verifyToken, tableController.createTable)

/* 
@Router POST api/table/update/:id/:isAddMember
@des update table
@access Public
*/
router.post(
	'/update/:id/:isAddMember',
	verifyToken,
	tableController.updateTable
)

/* 
@Router POST api/table/delete/:id
@des get table
@access Public
*/
router.delete('/delete', verifyToken, tableController.deleteTable)

/* 
@Router POST api/table/
@des get all table
@access Public
*/
router.get('/', verifyToken, tableController.getAllTable)

module.exports = router
