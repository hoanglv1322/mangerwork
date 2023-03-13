const Task = require('../models/Task')

class TaskController {
	createTask = async (req, res) => {
		try {
			const task = new Task(req.body)
			await task.save()
			res.status(200).json({
				success: true,
				message: 'Create task successfully',
				task,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Interval server',
			})
		}
	}

	updateTask = async (req, res) => {
		try {
			const taskUpdated = await Task.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{ new: true }
			)
			res.status(200).json({
				success: true,
				message: 'Update task successfully',
				task: taskUpdated,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'internal server',
			})
		}
	}

	getAllTask = async (req, res) => {
		try {
			const tasks = await Task.find()
			res.status(200).json({
				success: true,
				tasks,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Interval server',
			})
		}
	}

	deleteTask = async (req, res) => {
		try {
			const task = await Task.findByIdAndDelete(req.params.id)
			res.status(200).json({
				success: true,
				message: 'Delete task successfully',
				task,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'internal server!',
			})
		}
	}
}

module.exports = new TaskController()
