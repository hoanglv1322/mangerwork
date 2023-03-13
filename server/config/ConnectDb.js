const mongoose = require('mongoose')

const connectDb = async () => {
	mongoose.set('strictQuery', false)
	try {
		await mongoose.connect(process.env.MONGODB)
		console.log('Connected to mongodb!')
	} catch (e) {
		console.log(e)
		process.exit(1)
	}
}

module.exports = connectDb
