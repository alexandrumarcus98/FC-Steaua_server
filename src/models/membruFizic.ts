import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import { IMembruAsociat, IMembruFizic } from "src/global";
const membruFizicSchema = new mongoose.Schema<IMembruFizic>({
	email: {
		type: String,
		required: true,
		unique: true
	},
	tokens: [{
		token: {
			type: String,
			required: true,
		},
	}],
	data: Object,
	parola: {
		type: String,
	},
	comenzi: Array<{
		nrComanda: string
	}>,
	adresa: String,
	sex: String,
	nume: String,
	prenume: String,
	oras: String,
	regiune: String,
	tara: String,
	dataNasterii: String,
	tipAbonament: String,
	nrTel: String,
	membrii: Array<IMembruAsociat>
})

const MembruFizic = mongoose.model('Membru Fizic', membruFizicSchema)

membruFizicSchema.methods.verifyPassword = async function (password: string) {
	const user = this;
	const isMatch = await bcrypt.compare(password, user.password);
	return isMatch;
};

export default MembruFizic
