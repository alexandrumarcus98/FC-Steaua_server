export interface IMembruFizic extends Document {
  email: string;
  password: string;
  tipAbonament: string;
  tokens: [string];
  comenzi: Array<{
    nrComanda: string;
  }>;
  sex: any;
  nume: string;
  prenume: string;
  dataNasterii: string;
  nrTel: string;
  membrii: Array<any>;
  oras: string;
  regiune: string;
  tara: string;
  adresa: string;
  data: any;
  serieUtilizator: string;
  nrMembru: string;
}

export interface IMembruAsociat extends Document {
  numeAsociat: string;
  prenumeAsociat: string;
  emailAsociat: string;
  nrTelAsociat: string;
  sexAsociat: any;
  adresaAsociat: string;
  tipAbonament: string;
  serieUtilizator: string;
  nrMembru: string;
}

export interface IMembruJuridic extends Document {
  emailCompanie: string;
  tokens: [string];
  comenzi: Array<{
    nrComanda: string;
  }>;
  data: any;
  sediuSocial: string;
  numeCompanie: string;
  tipAbonament: string;
  nrTelCompanie: string;
  cuiCompanie?: string;
  cifCompanie?: string;
  serieUtilizator: string;
  nrMembru: string;
  nume: string;
  prenume: string;
  regComert: string;
  tara: string;
  regiune: string;
  oras: string;
  banca: string;
  IBAN: string;
  codPostal: string;
}
