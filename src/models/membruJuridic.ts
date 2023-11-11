import mongoose from "mongoose";
import { IMembruJuridic } from "src/global";
import { v4 as uuidv4 } from 'uuid';

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
		default: "00001",
		unique: true,
	},
	numeCompanie: String,
	serieUtilizator: {
		type: String,
		default: uuidv4
	},
	cifCompanie: String,
	nrTelCompanie: String,
	adresaCompanie: String,
})

const MembruJuridic = mongoose.model('membruJuridic', membruJuridicSchema)
export default MembruJuridic
