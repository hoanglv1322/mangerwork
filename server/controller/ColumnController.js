const Column = require('../models/Column')

class ColumnController {
	createColumn = async (req, res) => {
		const { name } = req.body
		if (!name) {
			return res.status(400).json({
				success: false,
				message: 'Invalid information column',
			})
		}

		const column = new Column(req.body)
		column.tableId = req.params.tableId
		try {
			const saveColumn = await column.save()
			res.status(200).json({
				success: true,
				message: 'Create column successfully',
				column: saveColumn,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Interval server',
			})
		}
	}

	updateColumn = async (req, res) => {
		try {
			const columnUpdated = await Column.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{ new: true }
			)
			res.status(200).json({
				success: true,
				message: 'Update column successfully',
				column: columnUpdated,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'internal server',
			})
		}
	}

	getAllColumn = async (req, res) => {
		try {
			const columns = await Column.find().populate('cards')
			res.status(200).json({
				success: true,
				columns,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Interval server',
			})
		}
	}

	deleteColumn = async (req, res) => {
		try {
			const column = await Column.findByIdAndDelete(req.params.id)
			res.status(200).json({
				success: true,
				message: 'Delete column successfully',
				column,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'internal server!',
			})
		}
	}
}

module.exports = new ColumnController()
