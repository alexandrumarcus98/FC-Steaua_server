import mongoose from 'mongoose'

const tokenNewUserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		ref: 'Utilizator Fizic',
		unique: true
	},
	token: {
		type: String,
		required: true
	},
})

const TokenNewUser = mongoose.model('TokenNewUser', tokenNewUserSchema)

export default TokenNewUser
