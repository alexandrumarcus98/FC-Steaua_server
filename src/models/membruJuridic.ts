import mongoose from "mongoose";
import { IMembruJuridic } from "src/global";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs'

const membruJuridicSchema = new mongoose.Schema<IMembruJuridic>({
	emailCompanie: {
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
	tipAbonament: String,
	comenzi: Array<{
		nrComanda: string
	}>,
	nrMembru: {
		type: String,
		default: "0000001",
		unique: true,
	},
	numeCompanie: String,
	serieUtilizator: {
		type: String,
		default: uuidv4
	},
	nume: String,
	prenume: String,
	cuiCompanie: String,
	nrTelCompanie: String,
	sediuSocial: String,
	IBAN: String,
	regComert: String,
	banca: String,
	semnatura: String,
	password: String
})

membruJuridicSchema.pre('save', async function (next: any) {
  if (!this.isModified('password')) {
    next()
  }

	const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

membruJuridicSchema.methods.verifyPassword = async function (enteredPassword: string) {
  return bcrypt.compare(enteredPassword, this.password, (err, same) => {
		if(err) return false
		else return same
	})
}

const MembruJuridic = mongoose.model('membruJuridic', membruJuridicSchema)
export default MembruJuridic
