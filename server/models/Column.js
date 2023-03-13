const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ColumnSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: { type: String },
	tableId: { type: String },
	createdAt: {
		type: Date,
		default: Date.now(),
	},
})

module.exports = mongoose.model('columns', ColumnSchema)
