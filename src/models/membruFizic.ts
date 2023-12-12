import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';
import { IMembruFizic } from "src/global";
import { membruAsociatSchema } from "./membruAsociat";

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
		maxlength: 255,
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
	membrii: [{
		type: membruAsociatSchema,
		ref: 'Membru Asociat'
	}],
	semnatura: String
})


membruFizicSchema.pre('save', async function (next: any) {
	if (!this.isModified('password')) {
    next()
  } else {
		const salt = await bcrypt.genSalt(10)
		this.password = await bcrypt.hash(this.password, salt)
	}
})

membruFizicSchema.pre("deleteOne", { document: true, query: false }, async function(next) {
	let id = this?._id
	await mongoose.model("Membru Asociat").deleteMany({ parentUserId: id })
	.then(() => {
		next()
	})
	.catch(err => next(err))
});

membruFizicSchema.methods.verifyPassword = async function(password: string) {
	return await bcrypt.compare(password, this.password)

};


const MembruFizic = mongoose.model('Membru Fizic', membruFizicSchema)
export default MembruFizic
