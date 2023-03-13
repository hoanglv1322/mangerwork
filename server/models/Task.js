const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = mongoose.Schema({
	content: {
		type: String,
		required: true,
	},
	cardId: { type: String },
	isDone: {
		type: Boolean,
		default: false,
	},
	dealine: {
		type: Date,
		default: Date.now(),
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
})

module.exports = mongoose.model('tasks', TaskSchema)
