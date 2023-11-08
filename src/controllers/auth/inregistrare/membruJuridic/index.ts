import asyncHandler from 'express-async-handler'
import geoip from 'geoip-lite'
import MembruJuridic from 'src/models/membruJuridic'

const inregistrareMembruJuridic: any = asyncHandler(async (req, res): Promise<any> => {
	if (req.method !== "POST") return res.status(404).json({ message: "Ceva nu a mers bine..." })
	let { emailCompanie, cifCompanie, cuiCompanie, numeCompanie, tipAbonamnet, nrTelCompanie, adresaCompanie } = req.body
	const userExists = await MembruJuridic.findOne({ emailCompanie })
	if (userExists) {
		return res.status(404).json({ message: 'Utilizatorul exista deja...' })
	}

	const user = await MembruJuridic.create({
		cuiCompanie: cuiCompanie,
		cifCompanie: cifCompanie,
		numeCompanie: numeCompanie,
		emailCompanie: emailCompanie,
		adresaCompanie: adresaCompanie,
		nrTelCompanie: nrTelCompanie,
		tipAbonament: tipAbonamnet,
		data: {
			ipInfo: res.locals.ipInfo || req.ip || req.socket.remoteAddress,
			socketInfo: geoip.lookup(res.locals.ipInfo || req.ip || req.socket.remoteAddress),
			ip: req.ip,
			socketIp: req.socket.remoteAddress,
			ua: res.locals.ua
		},
	})

	if (user?._id)
		return res.status(201).json({ message: "Cont creat cu success.", userId: user?._id })
})

export { inregistrareMembruJuridic }
