const Card = require('../models/Card')

class CardController {
	createCard = async (req, res) => {
		const { name } = req.body
		if (!name) {
			return res.status(400).json({
				success: false,
				message: 'Invalid information card',
			})
		}
		const card = new Card(req.body)
		try {
			const saveCard = await card.save()
			res.status(200).json({
				success: true,
				message: 'Create card successfully',
				card: saveCard,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Interval server',
			})
		}
	}

	createCardCSV = async (req, res) => {
		const listCardAdd = req.body
		const cards = []
		listCardAdd &&
			(await listCardAdd.map((cardAdd) => {
				let card = new Card(cardAdd)
				const saveCard = card.save()
				cards.push(saveCard)
			}))
		res.status(200).json({
			success: true,
			message: 'Create card successfully',
			cards,
		})
	}

	updateCard = async (req, res) => {
		try {
			const cardUpdated = await Card.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
					upsert: true,
				},
				{ new: true }
			)
			res.status(200).json({
				success: true,
				message: 'Update card successfully',
				card: cardUpdated,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'internal server',
			})
		}
	}

	getAllCard = async (req, res) => {
		try {
			const cards = await Card.find()
			res.status(200).json({
				success: true,
				cards,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Interval server',
			})
		}
	}

	deleteCard = async (req, res) => {
		try {
			const card = await Card.findByIdAndDelete(req.params.id)
			res.status(200).json({
				success: true,
				message: 'Delete card successfully',
				card,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'internal server!',
			})
		}
	}
}

module.exports = new CardController()
