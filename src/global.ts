import { IPinfo } from "node-ipinfo"

export interface IMembruFizic extends Document {
	email: string
	parola: string
	tipAbonament: string
	tokens: [string]
	comenzi: Array<{
		nrComanda: string
	}>
	sex: string
	nume: string
	prenume: string
	dataNasterii: string
	nrTel: string
	membrii: Array<any>
	oras: string
	regiune: string
	tara: string
	adresa: string
	data: {
		ipInfo: string,
		socketInfo: Object | String,
		ip: string,
		socketIp: string,
		ua: Object | String
	},
}

export interface IMembruAsociat extends Document {
	numeAsociat: string
	prenumeAsociat: string
	emailAsociat: string
	nrTelAsociat: string
	sexAsociat: string
	adresaAsociat: string
	tipAbonament: string
}

export interface IMembruJuridic extends Document {
	emailCompanie: string
	tokens: [string]
	comenzi: Array<{
		nrComanda: string
	}>
	data: {
		ipInfo: string,
		socketInfo: Object | String,
		ip: string,
		socketIp: string,
		ua: Object | String
	},
	adresaCompanie: string
	numeCompanie: string
	tipAbonament: string
	nrTelCompanie: string
	cuiCompanie?: string
	cifCompanie?: string
}
