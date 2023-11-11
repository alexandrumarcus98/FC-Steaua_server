import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { config } from 'src/config/config'
import { sendVerificationCode } from 'src/config/nodemailer/config'
import TokenEmailOTP from 'src/models/tokenEmail'

const sendEmailOTPFizic: any = asyncHandler(async (req, res): Promise<any> => {
	const { email } = req.body

	if (!(email)) {
		return res.status(401).json({ msg: "Email-ul este necesar." })
	}

	let number = Math.floor(100000 + Math.random() * 900000)
	let tokenNew = jwt.sign({ email }, config.jsonwebtoken, {
		expiresIn: '1m',
	})

	let findToken = await TokenEmailOTP.find({
		email: email,
	})
	if (findToken) {
		await TokenEmailOTP.findOneAndDelete({
			email: email
		}).then(async () => {
			let token = await TokenEmailOTP.create({
				email: email,
				number: number,
				token: tokenNew
			})
			if (token) {
				sendVerificationCode(email, number.toString())
					.then(() => res.status(201).json({ msg: 'Email a fost trimis.' }))
					.catch(() => res.status(404).json({ msg: 'error' }))
			}
		})
	} else {
		let token = await TokenEmailOTP.create({
			email: email,
			number: number,
			token: tokenNew
		})
		if (token) {
			sendVerificationCode(email, number.toString())
				.then(() => res.status(201).json({ msg: 'Email a fost trimis.' }))
				.catch(() => res.status(404).json({ msg: 'error' }))
		}
	}
})

const sendEmailOTPJuridic: any = asyncHandler(async (req, res): Promise<any> => {
	const { emailCompanie } = req.body

	if (!(emailCompanie)) {
		return res.status(401).json({ msg: "Email-ul este necesar." })
	}

	let number = Math.floor(100000 + Math.random() * 900000)
	let tokenNew = jwt.sign({ emailCompanie }, config.jsonwebtoken, {
		expiresIn: '1min',
	})
	let findToken = await TokenEmailOTP.find({
		email: emailCompanie,
	})


	if (!findToken) {
		let token = await TokenEmailOTP.create({
			email: emailCompanie,
			number: number,
			token: tokenNew
		})
		if (token) {
			sendVerificationCode(emailCompanie, number.toString())
				.then(() => res.status(201).json({ msg: 'Email a fost trimis.' }))
				.catch(() => res.status(404).json({ msg: 'error' }))
		}
	} else {
		await TokenEmailOTP.findOneAndDelete({
			email: emailCompanie
		}).then(async () => {
			let token = await TokenEmailOTP.create({
				email: emailCompanie,
				number: number,
				token: tokenNew
			})
			if (token) {
				sendVerificationCode(emailCompanie, number.toString())
					.then(() => res.status(201).json({ msg: 'Email a fost trimis.' }))
					.catch(() => res.status(404).json({ msg: 'error' }))
			}
		})
	}
})

const verifyOTPEmailFizic: any = asyncHandler(async (req, res): Promise<any> => {
	const { number, email } = req.body

	if (!(email)) {
		return res.status(401).json({ msg: "Email-ul este necesar." })
	}

	if (!(number)) {
		return res.status(401).json({ msg: "OTP-ul este necesar." })
	}

	let findToken = await TokenEmailOTP.findOne({
		email: email,
		number: number,
	})

	if (findToken) {
		return res.status(201).json({ message: "Valid", isValid: true })
	} else {
		return res.status(403).json({ message: "Cod invalid", isValid: false })
	}
})

const verifyOTPEmailJuridic: any = asyncHandler(async (req, res): Promise<any> => {
	const { number, emailCompanie } = req.body

	if (!(emailCompanie)) {
		return res.status(401).json({ msg: "Email-ul este necesar." })
	}

	if (!(number)) {
		return res.status(401).json({ msg: "OTP-ul este necesar." })
	}

	let findToken = await TokenEmailOTP.findOne({
		email: emailCompanie,
		number: number,
	})

	if (findToken) {
		return res.status(201).json({ message: "Valid", isValid: true })
	} else {
		return res.status(403).json({ message: "Cod invalid", isValid: false })
	}
})

export { sendEmailOTPFizic, sendEmailOTPJuridic, verifyOTPEmailFizic, verifyOTPEmailJuridic }

