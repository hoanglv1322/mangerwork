const express = require('express')
const router = express.Router()
const cardController = require('../controller/CardController')
const verifyToken = require('../util/verifyToken')

/* 
@Router POST api/card/create
@des create card
@access user
*/
router.post('/create', verifyToken, cardController.createCard)

/* 
@Router POST api/card/createcsv
@des create card from file csv
@access user
*/
router.post('/createcsv', verifyToken, cardController.createCardCSV)

/* 
@Router POST api/card/update/:id
@des update card
@access user
*/
router.post('/update/:id', verifyToken, cardController.updateCard)

/* 
@Router POST api/card/:id
@des get all card
@access user
*/
router.get('/', verifyToken, cardController.getAllCard)

/* 
@Router POST api/card/delete/:id
@des delete card
@access user
*/
router.delete('/delete/:id', verifyToken, cardController.deleteCard)

module.exports = router
