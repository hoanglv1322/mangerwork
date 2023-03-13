const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TableSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	admin: { type: String },
	workPlaceId: { type: String },
	description: { type: String },
	scope: { type: String },
	members: [{ type: String }],
	background: { type: String },
	createdAt: {
		type: Date,
		default: Date.now(),
	},
})

module.exports = mongoose.model('tables', TableSchema)
