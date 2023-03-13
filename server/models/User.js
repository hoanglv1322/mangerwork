const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
	},
	recentlyTables: [{ type: String }],
	favoriteTables: [{ type: String }],
	invitedTables: [{ type: String }],
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	isAdMin: {
		type: Boolean,
		default: false,
	},
	isActive: {
		type: Boolean,
		default: false,
	},
})

module.exports = mongoose.model('users', UserSchema)
