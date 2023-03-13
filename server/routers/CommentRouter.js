const express = require('express')
const router = express.Router()
const commentController = require('../controller/CommentController')
const verifyToken = require('../util/verifyToken')

/* 
@Router POST api/comment/create
@des create comment
@access user
*/
router.post('/create', verifyToken, commentController.createComment)

/* 
@Router POST api/comment/update/:id
@des update comment
@access user
*/
router.post('/update/:id', verifyToken, commentController.updateComment)

/* 
@Router POST api/comment
@des get all card
@access user
*/
router.get('/', verifyToken, commentController.getAllComment)

/* 
@Router POST api/comment/delete/:id
@des delete comment
@access user
*/
router.delete('/delete/:id', verifyToken, commentController.deleteComment)

module.exports = router
