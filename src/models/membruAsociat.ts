import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import { IMembruAsociat } from "src/global";
export const membruAsociatSchema = new mongoose.Schema<IMembruAsociat>({
	numeAsociat: {
		type: String
	},
	prenumeAsociat: {
		type: String
	},
	emailAsociat: {
		type: String,
		required: true,
		unique: true
	},
	nrTelAsociat: {
		type: String
	},
	sexAsociat: {
		type: Array<any>
	},
	serieUtilizator: {
		type: String,
		default: uuidv4
	},
	nrMembru: {
		type: String,
		default: "0000001",
		unique: true,
	},
	tipAbonament: {
		type: String
	},
})

const MembruAsociat = mongoose.model('Membru Asociat', membruAsociatSchema)

export default MembruAsociat
