function validateEmail(email) {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(String(email).toLowerCase())
}

const validateRegister = async (req, res, next) => {
	const { username, email, password, confirmPassword } = req.body

	const errors = []

	if (!username) {
		errors.push('Please add your name.')
	} else if (username.length > 20) {
		errors.push('Your name is up to 20 chars long.')
	}

	if (!email) {
		errors.push('Please add your email.')
	} else if (!validateEmail(email)) {
		errors.push('Email format is incorrect.')
	}

	if (password.length < 6) {
		errors.push('Password must be at least 6 chars.')
	}

	if (password != confirmPassword) {
		errors.push('Confirm password is not incorrect')
	}

	if (errors.length > 0)
		return res.status(400).json({ success: false, message: errors })

	next()
}

module.exports = validateRegister
