import asyncHandler from "express-async-handler";
import geoip from "geoip-lite";
import { IPinfo, LruCache, Options, IPinfoWrapper } from "node-ipinfo";
import { sendQRCodeAccountConfirmation } from "src/config/nodemailer/config";
import MembruAsociat from "src/models/membruAsociat";
import MembruFizic from "src/models/membruFizic";
import MembruJuridic from "src/models/membruJuridic";

const inregistrareMembruJuridic: any = asyncHandler(
  async (req, res): Promise<any> => {
    if (req.method !== "POST")
      return res.status(404).json({ message: "Ceva nu a mers bine..." });
    let {
      emailCompanie,
      cuiCompanie,
      numeCompanie,
      nume,
      prenume,
      tipAbonamnet,
      IBAN,
      comenzi,
      banca,
      regComert,
      nrTelCompanie,
      semnatura,
      sediuSocial,
    } = req.body;

    if (!emailCompanie) {
      return res
        .status(401)
        .json({ message: "Ne pare rau, emailul furnizat nu este corect." });
    }

    const userExists = await MembruJuridic.findOne({ emailCompanie });
    if (userExists) {
      return res.status(404).json({ message: "Utilizatorul exista deja..." });
    }

    const cacheOptions: Options<string, any> = {
      max: 5000,
      ttl: 24 * 1000 * 60 * 60,
    };
    const cache = new LruCache(cacheOptions);
    const ipinfoWrapper = new IPinfoWrapper("2dcedce28f0ef8", cache);

    try {
      const membriiFizici = await MembruFizic.find({});
      const membriiAsociati = await MembruAsociat.find({});
      const membriiJuridici = await MembruJuridic.find({});
      const lMembriiFizici = membriiFizici?.length;
      const lMemmbriiAsociati = membriiAsociati.length;
      const lMembriiJuridici = membriiJuridici.length;
      let nrMembru = (lMembriiFizici + lMemmbriiAsociati + lMembriiJuridici + 1)
        .toString()
        .padStart(7, "0");
      ipinfoWrapper
        .lookupIp(req?.ip || req?.socket?.remoteAddress)
        .then(async (response: IPinfo) => {
          const user = await MembruJuridic.create({
            comenzi: comenzi,
            cuiCompanie: cuiCompanie,
            nume: nume,
            nrMembru: nrMembru,
            prenume: prenume,
            numeCompanie: numeCompanie,
            emailCompanie: emailCompanie,
            semnatura: semnatura,
            sediuSocial: sediuSocial,
            IBAN: IBAN,
            banca: banca,
            regComert: regComert,
            nrTelCompanie: nrTelCompanie,
            tipAbonament: tipAbonamnet,
            data: {
              ipInfo: res.locals.ipInfo || req.ip || req.socket.remoteAddress,
              socketInfo: geoip.lookup(
                res.locals.ipInfo || req.ip || req.socket.remoteAddress
              ),
              ip: req.ip,
              socketIp: req.socket.remoteAddress,
              ua: res.locals.ua,
              location: response || null,
            },
          });

          if (user?._id) {
            sendQRCodeAccountConfirmation(
              user?.emailCompanie,
              user?.prenume,
              user?.serieUtilizator,
              user?.comenzi[0]?.nrComanda.toString()
            );
            return res.status(201).json({
              nume: user?.nume,
              prenume: user?.prenume,
              email: user?.emailCompanie,
              tipAbonament: user?.tipAbonament,
              userId: user?._id,
              nrMembru: user?.nrMembru,
              comenzi: user?.comenzi,
              serieUtilizator: user?.serieUtilizator,
              message: "Cont creat cu success.",
            });
          }
        })
        .catch((err) => res.status(401).json({ message: err }));
    } catch (err) {
      if (err) return res.status(201).json({ message: err });
    }
  }
);

export { inregistrareMembruJuridic };
