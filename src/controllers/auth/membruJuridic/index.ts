import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import MembruJuridic from 'src/models/membruJuridic'

const detaliiMembruJuridic: any = asyncHandler(async (req, res): Promise<any> => {
	const cookies = req.header('Cookie').split(";")
	let foundToken = ''
	cookies.forEach(k => {
		if (k.startsWith(' jwt') || k.startsWith('jwt')) {
			foundToken = k.split('=')[1]
		}
	})
	let decodedToken = jwt.decode(foundToken)

	if (!decodedToken) return res.status(401).json({ message: "Eroare." })

	const user = await MembruJuridic.findById(decodedToken?.userId)

	if (user) {
		return res.status(201).json({
			comenzi: user?.comenzi,
			tipAbonament: user?.tipAbonament,
			email: user?.emailCompanie
		})
	} else return res.status(401).json({ message: 'Utilizatorul nu a fost gasit...' })
})

const verificareJuridic: any = asyncHandler(async (req, res): Promise<any> => {
	let utilizator = await MembruJuridic.findOne({
		emailCompanie: req.body.emailCompanie
	})

	if (utilizator?._id)
		return res.status(403).json({ message: 'Utilizatorul exista deja.' })

	utilizator = await MembruJuridic.findOne({
		nrTel: req?.body?.nrTelCompanie?.split(' ')?.join("")
	})

	if (utilizator?._id)
		return res.status(403).json({ message: 'Utilizatorul exista deja.' })

	return res.status(201).json({ validUser: true })
})

export { detaliiMembruJuridic, verificareJuridic }
