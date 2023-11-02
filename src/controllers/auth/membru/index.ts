import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import Membru from 'src/models/membru';

const detaliiMembru: any = asyncHandler(async (req, res): Promise<any> => {
	const token = req.header('Cookie').split("jwt_authorization_steaua=")[1];
	console.log(req.header('Cookie'))
	let decodedToken = jwt.decode(token)

	if (!decodedToken) return res.status(401).json({ message: "Eroare json." })

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
