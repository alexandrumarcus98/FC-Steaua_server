import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import { UserDoc } from "src/global";

const membruSchema = new mongoose.Schema<UserDoc>({
	email: {
		type: String,
		required: true,
		unique: true
	},
	tip: {
		type: String,
		required: true
	},
	tokens: [{
		token: {
			type: String,
			required: true,
		},
	}],
	parola: {
		type: String,
	},
	comenzi: Array<{
		nrComanda: string
		produs: string,
		pret: string
	}>,
	date: {
		juridic: {
			nume: String,
			cif: String,
			email: String,
			nrTel: String
		},
		fizic: {
			sex: String,
			nume: String,
			prenume: String,
			oras: String,
			regiune: String,
			tara: String,
			dataNasterii: String,
			nrTel: String,
			membrii: Array<any>
		}
	}
})

const Membru = mongoose.model('Membru Schema', membruSchema)

membruSchema.methods.verifyPassword = async function (password: string) {
	const user = this;
	const isMatch = await bcrypt.compare(password, user.password);
	return isMatch;
};

export default Membru
