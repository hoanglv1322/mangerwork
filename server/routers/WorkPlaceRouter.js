const express = require('express')
const router = express.Router()
const workPlaceController = require('../controller/WorkPlaceController')
const verifyToken = require('../util/verifyToken')

/* 
@Router POST api/workplace/create
@des create workplace
@access user
*/
router.post('/create', verifyToken, workPlaceController.createWorkPalce)

/* 
@Router POST api/workplace/update/:id/:isAddMember
@des update workplace
@access user
*/
router.post(
	'/update/:id/:isAddMember',
	verifyToken,
	workPlaceController.updateWorkPlace
)

/* 
@Router DELETE api/workplace/delete/:id
@des delete workplace
@access user
*/
router.delete('/delete/:id', verifyToken, workPlaceController.deleteWorkPlace)

/* 
@Router POST api/workplace/
@des get all workplace
@access user
*/
router.get('/', verifyToken, workPlaceController.getAllWorkPlace)

module.exports = router
