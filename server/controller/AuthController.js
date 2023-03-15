const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const sendMail = require('../config/sendEmail')

const CLIENT_URL = `${process.env.BASE_URL_VERIFYUSER}`
const txt = {
	title: 'WELLCOME TO WEB MANAGER WORK',
	des: 'Congratulations! You are almost set to start using Manager Work. Just click the button below to validate your email address.',
	button: 'Verify Email',
}

class AuthController {
	//check user
	checkAuth = async (req, res) => {
		try {
			const user = await User.findById(req.userId).select('-password')
			if (!user) {
				return res.status(400).json({
					success: false,
					message: 'User not found in database',
				})
			}
			res.status(200).json({ success: true, user })
		} catch (err) {
			console.error(err)
			res.status(500).json({
				success: false,
				message: 'Internal server',
			})
		}
	}

	// verify user
	verifyUser = async (req, res) => {
		try {
			const user = await User.findByIdAndUpdate(
				req.params.userId,
				{
					$set: { isActive: true },
				},
				{ new: true }
			)
			if (!user) {
				return res.status(400).json({
					success: false,
					message: 'User not found in database',
				})
			}
			res.status(200).json({
				success: true,
				message: 'verify account success!, login to use web',
				user,
			})
		} catch (err) {
			res.status(500).json({
				success: false,
				message: 'internal server',
			})
		}
	}

	//register account
	register = async (req, res) => {
		const { username, password, email, isActive } = req.body
		try {
			//email exits in database
			const account = await User.findOne({ email: email })
			if (account) {
				return res.status(400).json({
					success: false,
					message: ['email already exits'],
				})
			}
			//all good
			//hash password
			const salt = await bcrypt.genSalt(10)
			const hashPassword = await bcrypt.hash(password, salt)
			const newUser = await User({
				username,
				email,
				isActive,
				password: hashPassword,
			})

			//send email to user
			const url = `${CLIENT_URL}`
			sendMail(email, url, txt)

			//save account in database
			await newUser.save()

			//return token
			const accessToken = await jwt.sign(
				{ userID: newUser._id },
				process.env.ACCESS_TOKEN_SECRET
			)

			res.status(200).json({
				success: true,
				message: 'Register account success!!!, please verify email!',
				user: newUser,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'internal server',
			})
		}
	}

	//login with email and password
	login = async (req, res) => {
		const { email, password } = req.body

		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: 'Invalid email or password',
			})
		}

		try {
			const user = await User.findOne({ email })
			if (!user) {
				return res.status(400).json({
					success: false,
					message: 'Invalid email or password',
				})
			}

			//user not verify email
			if (!user.isActive) {
				return res.status(400).json({
					success: false,
					message: 'Email is not verify, please verify email first',
				})
			}

			//user founded
			const match = await bcrypt.compare(password, user.password)
			if (!match) {
				return res.status(400).json({
					success: false,
					message: 'Invalid email or password ',
				})
			}

			//return token
			const accessToken = await jwt.sign(
				{ userID: user._id },
				process.env.ACCESS_TOKEN_SECRET
			)

			res.status(200).json({
				success: true,
				accessToken,
				user,
			})
		} catch (err) {
			res.status(500).json({
				success: false,
				message: 'Internal server error',
			})
		}
	}

	//rest password
	reset = async (req, res) => {
		const email = req.params.email
		try {
			const user = await User.findOne({ email })
			if (!user) {
				return res.status(400).json({
					success: false,
					message: 'Email is not registed account',
				})
			}

			const code = Math.floor(Math.random() * (999999 - 100000) + 100000)

			const txtCode = {
				title: 'Code num to rest password',
				des: 'Below is code num to you reset your password',
				button: code,
			}

			//send email to user
			const url = `${CLIENT_URL}`
			sendMail(email, url, txtCode)

			res.status(200).json({
				success: true,
				code,
			})
		} catch (err) {
			res.status(500).json({
				success: false,
				message: 'Internal server error',
			})
		}
	}

	//change password
	changePassword = async (req, res) => {
		const { password, email } = req.body
		const salt = await bcrypt.genSalt(10)
		const hashPassword = await bcrypt.hash(password, salt)
		try {
			const user = await User.findOneAndUpdate(
				{ email: email },
				{ $set: { password: hashPassword } },
				{ new: true }
			)
			res.status(200).json({
				success: true,
				message: 'Change password successfully',
				user,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Internal server error',
			})
		}
	}

	//notify user
	notifyUser = async (req, res) => {
		const { email, title, description } = req.body
		try {
			const user = await User.findOne({ email })
			if (!user) {
				return res.status(400).json({
					success: false,
					message: 'Email is not registed account',
				})
			}
			const txtNotify = {
				title: title,
				des: description,
				button: 'Admin',
			}
			//send email to user
			const url = `${CLIENT_URL}`
			sendMail(email, url, txtNotify)

			res.status(200).json({
				success: true,
				txtNotify,
			})
		} catch (err) {
			res.status(500).json({
				success: false,
				message: 'Internal server error',
			})
		}
	}
}

module.exports = new AuthController()
