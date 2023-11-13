import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
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
	password: {
		type: String,
	},
	comenzi: Array<{
		nrComanda: string
	}>,
	serieUtilizator: {
		type: String,
		default: uuidv4
	},
	nrMembru: {
		type: String,
		default: "0000001",
		unique: true,
	},
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
	membrii: Array<IMembruAsociat>,
	semnatura: String
})
membruFizicSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

membruFizicSchema.methods.verifyPassword = async function (password: string) {
	const user = this;
	const isMatch = await bcrypt.compare(password, user.password);
	return isMatch;
};


const MembruFizic = mongoose.model('Membru Fizic', membruFizicSchema)
export default MembruFizic
