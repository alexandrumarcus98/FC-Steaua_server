import mongoose from 'mongoose'

const tokenEmailOTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	token: {
		type: String,
		required: true,
	},
	number: {
		type: String,
		required: true,
	},
	expireAt: {
		type: Date,
		default: Date.now,
		index: { expires: '1m' },
	},
})

const TokenEmailOTP = mongoose.model('Token Email OTP', tokenEmailOTPSchema)

export default TokenEmailOTP
