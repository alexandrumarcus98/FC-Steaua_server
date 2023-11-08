import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import MembruFizic from 'src/models/membruFizic'

const detaliiMembruFizic: any = asyncHandler(async (req, res): Promise<any> => {
	const cookies = req.header('Cookie').split(";")
	let foundToken = ''
	cookies.forEach(k => {
		if (k.startsWith(' jwt') || k.startsWith('jwt')) {
			foundToken = k.split('=')[1]
		}
	})
	let decodedToken = jwt.decode(foundToken)

	if (!decodedToken) return res.status(401).json({ message: "Eroare." })

	const user = await MembruFizic.findById(decodedToken?.userId)

	if (user) {
		return res.status(201).json({
			comenzi: user?.comenzi,
			tipAbonament: user?.tipAbonament,
			email: user?.email
		})
	} else return res.status(401).json({ message: 'Utilizatorul nu a fost gasit...' })
})

const locatieUseri: any = asyncHandler(async (req, res): Promise<any> => {
	let users = await MembruFizic.find({})
	if (users.length) {
		return res.status(201).json({
			locatii: users.map(i => ({
				ll: i.data?.socketInfo?.ll,
				location: i?.data?.location,
				country: i?.data?.socketInfo?.country,
				city: i?.data?.socketInfo?.city,
				id: i?._id,
			}))
		})
	}

	return res.status(201)
})

export { detaliiMembruFizic, locatieUseri }
