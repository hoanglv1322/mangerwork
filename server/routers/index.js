const authRouter = require('./AuthRouter')
const userRouter = require('./UserRouter')
const workpalceRouter = require('./WorkPlaceRouter')
const tableRouter = require('./TableRouter')
const columnRouter = require('./ColumnRouter')
const cardRouter = require('./CardRouter')
const commentRouter = require('./CommentRouter')
const taskRouter = require('./TaskRouter')
const messagerRouter = require('./MessagerRouter')

function router(app) {
	app.use('/api/auth', authRouter)
	app.use('/api/user', userRouter)
	app.use('/api/workplace', workpalceRouter)
	app.use('/api/table', tableRouter)
	app.use('/api/column', columnRouter)
	app.use('/api/card', cardRouter)
	app.use('/api/comment', commentRouter)
	app.use('/api/task', taskRouter)
	app.use('/api/messager', messagerRouter)
}

module.exports = router
