const Messager = require('../models/Messager')

class MessagerController {
	createMessager = async (req, res) => {
		try {
			const messager = new Messager(req.body)
			await messager.save()
			res.status(200).json({
				success: true,
				message: 'Create messager successfully',
				messager,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Interval server',
			})
		}
	}

	updateMessager = async (req, res) => {
		try {
			const messagerUpdated = await Messager.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{ new: true }
			)
			res.status(200).json({
				success: true,
				message: 'Update messager successfully',
				messager: messagerUpdated,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'internal server',
			})
		}
	}

	getAllMessager = async (req, res) => {
		try {
			const messagers = await Messager.find().populate('author')
			res.status(200).json({
				success: true,
				messagers,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Interval server',
			})
		}
	}

	deleteMessager = async (req, res) => {
		try {
			const messager = await Messager.findByIdAndDelete(req.params.id)
			res.status(200).json({
				success: true,
				message: 'Delete messager successfully',
				messager,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'internal server!',
			})
		}
	}
}

module.exports = new MessagerController()
