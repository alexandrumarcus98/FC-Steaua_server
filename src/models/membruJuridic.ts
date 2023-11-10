import mongoose from "mongoose";
import { IMembruJuridic } from "src/global";

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
		produs: string,
		pret: string
	}>,
	numeCompanie: String,
	cifCompanie: String,
	nrTelCompanie: String,
	adresaCompanie: String,
})

const MembruJuridic = mongoose.model('membruJuridic', membruJuridicSchema)
export default MembruJuridic
