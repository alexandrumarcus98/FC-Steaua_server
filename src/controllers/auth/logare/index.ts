import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Membru from 'src/models/membru';
import { config } from 'src/config';

const logareMembru: any = asyncHandler(async (req, res): Promise<any> => {
	const { email, parola } = req.body;
	const user = await Membru.findOne({ email });
	if (!user) return res.status(400).send("Niciun cont nu a fost gasit.");
	const validPassword = await bcrypt.compare(parola, user?.parola);
	if (!validPassword)
		return res.status(400).send("Parola este gresita.");
	const token = jwt.sign({ userId: user.id }, config.jsonwebtoken);

	return res.send({
		token: token,
		data: {
			...user?.date,
			comenzi: user?.comenzi,
			tip: user?.tip,
		}
	});
})

export { logareMembru }
