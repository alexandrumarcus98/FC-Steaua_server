import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import Membru from 'src/models/membru'

const inregistrareMembru: any = asyncHandler(async (req, res): Promise<any> => {
	if (req.method !== "POST") return res.status(404).json({ message: "Ceva nu a mers bine..." })
	if (req?.body?.tip === 'fizic') {
		let { email, nume, prenume, sex, regiune, tara, oras, parola, nrTel, dataNasterii, tip, membrii } = req.body

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(parola, salt);

		const userExists = await Membru.findOne({ email })
		if (userExists) {
			return res.status(400).json({ message: 'Utilizatorul exista deja...' })
		}

		const user = await Membru.create({
			email: email,
			parola: hashedPassword,
			tip: tip,
			date: {
				fizic: {
					sex: sex,
					nrTel: nrTel,
					dataNasterii: dataNasterii,
					oras: oras,
					tara: tara,
					nume: nume,
					prenume: prenume,
					regiune: regiune,
					membrii: membrii
				}
			}
		})

		if (user?._id) {
			return res.status(201).json({
				userId: user?._id,
				message: "Cont creat cu success.",
			})
		}
	} else {
		let { email, parola, cui, companie, tip } = req.body
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(parola, salt);
		const userExists = await Membru.findOne({ email })
		if (userExists) {
			return res.status(404).json({ message: 'Utilizatorul exista deja...' })
		}

		const user = await Membru.create({
			email: email,
			tip: tip,
			parola: hashedPassword,
			date: {
				juridic: {
					cui: cui,
					nume: companie,
				}
			}
		})

		if (user?._id)
			return res.status(201).json({ message: "Cont creat cu success.", userId: user?._id })
	}
})

export { inregistrareMembru }
