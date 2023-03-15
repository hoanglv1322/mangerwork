const User = require('../models/User')

class UserController {
	//update user
	updateUser = async (req, res) => {
		try {
			const userUpdate = await User.findByIdAndUpdate(
				req.userId,
				{ $set: req.body },
				{ new: true }
			)
			res.status(200).json({
				success: true,
				message: 'User updated successfully',
				user: userUpdate,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'internal server!',
			})
		}
	}

	//get user
	getUser = async (req, res) => {
		try {
			const user = await User.findOne({ _id: req.userId }).populate(
				'tables'
			)
			res.status(200).json({
				success: true,
				message: 'Get ser successfully',
				user,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'internal server!',
			})
		}
	}

	//get all user
	getAllUsers = async (req, res) => {
		try {
			const allUsers = await User.find()
			res.status(200).json({
				success: true,
				message: 'Get user successfully',
				allUsers,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'internal server!',
			})
		}
	}

	//delete user
	deleteUser = async (req, res) => {
		try {
			const user = await User.findByIdAndDelete(req.params.id)
			res.status(200).json({
				success: true,
				message: 'Delete user successfully',
				user,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'internal server!',
			})
		}
	}

	updatedTableFavorite = async (req, res) => {
		try {
			const user = await User.findByIdAndUpdate(
				req.userId,
				{
					$addToSet: { favoriteTables: req.params.tableId },
				},
				{ new: true }
			)
			res.status(200).json({
				success: true,
				message: 'update table of user successfully',
				user,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'internal server!',
			})
		}
	}

	updatedTableDislike = async (req, res) => {
		try {
			const user = await User.findByIdAndUpdate(
				req.userId,
				{
					$pull: { favoriteTables: req.params.tableId },
				},
				{ new: true }
			)
			res.status(200).json({
				success: true,
				message: 'update table of user successfully',
				user,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'internal server!',
			})
		}
	}

	updateTableRecently = async (req, res) => {
		try {
			const user = await User.findByIdAndUpdate(
				req.userId,
				{
					$addToSet: { recentlyTables: req.params.tableId },
				},
				{ new: true }
			)
			res.status(200).json({
				success: true,
				message: 'update table of user successfully',
				user,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'internal server!',
			})
		}
	}
}

module.exports = new UserController()
