import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import geoip from 'geoip-lite'
import MembruFizic from 'src/models/membruFizic'
import { IPinfoWrapper, IPinfo } from "node-ipinfo";

const inregistrareMembruFizic: any = asyncHandler(async (req, res): Promise<any> => {
	if (req.method !== "POST") return res.status(404).json({ message: "Ceva nu a mers bine..." })
	let { email, nume, prenume, sex, regiune, tara, oras, parola, nrTel, dataNasterii, tipAbonament, membrii, adresa } = req.body

	if (!email) {
		return res.status(401).json({ message: 'Ne pare rau, emailul furnizat nu este corect.' })
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(parola, salt);

	const userExists = await MembruFizic.findOne({ email })
	if (userExists) {
		return res.status(400).json({ message: 'Utilizatorul exista deja...' })
	}

	const user = await MembruFizic.create({
		email: email,
		parola: hashedPassword,
		tipAbonament: tipAbonament,
		data: {
			ipInfo: res.locals.ipInfo || req.ip || req.socket.remoteAddress,
			socketInfo: geoip.lookup(res.locals.ipInfo || req.ip || req.socket.remoteAddress),
			ip: req.ip,
			socketIp: req.socket.remoteAddress,
			ua: res.locals.ua,
			location: ''
		},
		sex: sex,
		nrTel: nrTel,
		dataNasterii: dataNasterii,
		oras: oras,
		tara: tara,
		nume: nume,
		prenume: prenume,
		regiune: regiune,
		membrii: membrii,
		adresa: adresa,
	})

	if (user?._id) {
		return res.status(201).json({
			userId: user?._id,
			message: "Cont creat cu success.",
		})
	}
})

export { inregistrareMembruFizic }
