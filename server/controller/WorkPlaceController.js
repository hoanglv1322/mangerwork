const User = require('../models/User')
const WorkPlace = require('../models/WorkPlace')
const sendMail = require('../config/sendEmail')

const CLIENT_URL = `${process.env.BASE_URL}`

const txtAdd = {
	title: 'you are added to workpalce',
	des: 'you are add table, you can read and write work in tables in this workplace ',
	button: 'Visit Workplace',
}

const txtRemove = {
	title: 'you are logouted to workplace',
	des: 'you are logouted to workplace, you can not read and write work in workplace',
	button: 'Visit home',
}

class WorkPlaceController {
	createWorkPalce = async (req, res) => {
		const { name } = req.body
		if (!name) {
			return res.status(400).json({
				success: false,
				message: 'Invalid information workPlace',
			})
		}

		const workpalce = new WorkPlace(req.body)
		workpalce.admin = req.userId
		try {
			const saveWorkPlace = await workpalce.save()
			res.status(200).json({
				success: true,
				message: 'Create WorkPlace successfully',
				workPalce: saveWorkPlace,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Interval server',
			})
		}
	}

	updateWorkPlace = async (req, res) => {
		const isAddMember = req.params.isAddMember
		try {
			let workPalceUpdated
			const memberAdd = await User.findById(req.body.member)
			if (isAddMember === 'true') {
				workPalceUpdated = await WorkPlace.findByIdAndUpdate(
					req.params.id,
					{
						$set: req.body,
						$addToSet: { members: req.body.member },
					},
					{ new: true }
				)
				if (memberAdd) {
					const url = `${CLIENT_URL}`
					sendMail(memberAdd.email, url, txtAdd)
				}
			} else {
				workPalceUpdated = await WorkPlace.findByIdAndUpdate(
					req.params.id,
					{
						$set: req.body,
						$pull: { members: req.body.member },
					},
					{ new: true }
				)
				if (memberAdd) {
					const url = `${CLIENT_URL}`
					sendMail(memberAdd.email, url, txtRemove)
				}
			}
			res.status(200).json({
				success: true,
				message: 'Update workPlace successfully',
				workPlace: workPalceUpdated,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Interval server',
			})
		}
	}

	getAllWorkPlace = async (req, res) => {
		try {
			const workPlaces = await WorkPlace.find()
			res.status(200).json({
				success: true,
				workPlaces,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Interval server',
			})
		}
	}

	deleteWorkPlace = async (req, res) => {
		try {
			const workPlace = await WorkPlace.findByIdAndDelete(req.params.id)
			res.status(200).json({
				success: true,
				message: 'Delete workPlace successfully',
				workPlace,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'internal server!',
			})
		}
	}
}

module.exports = new WorkPlaceController()
