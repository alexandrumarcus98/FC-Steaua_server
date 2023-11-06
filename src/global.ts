export interface UserDoc extends Document {
	email: string
	parola: string
	tip: string
	tokens: [string]
	comenzi: Array<{
		nrComanda: string
		produs: string,
		pret: string
	}>
	date: {
		juridic: {
			nume: string
			cui: string
			nrTel: string
			email: string
		}
		fizic: {
			sex: string
			nume: string
			prenume: string
			dataNasterii: string
			nrTel: string
			membrii: Array<any>
			oras: string
			regiune: string
			tara: string
		}
	}
}
