const Comment = require('../models/Comment')

class CommentController {
	createComment = async (req, res) => {
		try {
			const comment = new Comment(req.body)
			await comment.save()
			res.status(200).json({
				success: true,
				message: 'Create comment successfully',
				comment,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Interval server',
			})
		}
	}

	updateComment = async (req, res) => {
		try {
			const commentUpdated = await Comment.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{ new: true }
			)
			res.status(200).json({
				success: true,
				message: 'Update comment successfully',
				comment: commentUpdated,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'internal server',
			})
		}
	}

	getAllComment = async (req, res) => {
		try {
			const comments = await Comment.find().populate('author')
			res.status(200).json({
				success: true,
				comments,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Interval server',
			})
		}
	}

	deleteComment = async (req, res) => {
		try {
			const comment = await Comment.findByIdAndDelete(req.params.id)
			res.status(200).json({
				success: true,
				message: 'Delete comment successfully',
				comment,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'internal server!',
			})
		}
	}
}

module.exports = new CommentController()
