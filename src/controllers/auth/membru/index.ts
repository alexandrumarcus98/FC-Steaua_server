import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import Membru from 'src/models/membru';

const detaliiMembru: any = asyncHandler(async (req, res): Promise<any> => {
	const cookies = req.header('Cookie').split(";")
	let foundToken = ''
	cookies.forEach(k => {
		console.log(k)
		if (k.startsWith(' jwt') || k.startsWith('jwt')) {
			foundToken = k.split('=')[1]
		}
	})
	let decodedToken = jwt.decode(foundToken)

	if (!decodedToken) return res.status(401).json({ message: "Eroare." })

	const user = await Membru.findById(decodedToken?.userId)

	if (user) {
		return res.status(201).json({
			...user?.date,
			comenzi: user?.comenzi,
			tip: user?.tip,
			email: user?.email
		})
	} else return res.status(401).json({ message: 'Utilizatorul nu a fost gasit...' })
})

export { detaliiMembru }
