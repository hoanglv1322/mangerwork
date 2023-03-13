const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WorkPalceSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	admin: { type: String },
	description: { type: String },
	scope: { type: String },
	members: [{ type: String }],
	createdAt: {
		type: Date,
		default: Date.now(),
	},
})

module.exports = mongoose.model('workplaces', WorkPalceSchema)
