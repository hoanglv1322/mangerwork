const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		cardId: { type: String },
		author: {
			type: Schema.Types.ObjectId,
			ref: 'users',
		},
		like: {
			type: Number,
			default: 0,
		},
		replys: [{ type: String }],
	},
	{ timestamps: true }
)

module.exports = mongoose.model('comments', CommentSchema)
