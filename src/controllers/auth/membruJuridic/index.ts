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

export { detaliiMembruJuridic }
