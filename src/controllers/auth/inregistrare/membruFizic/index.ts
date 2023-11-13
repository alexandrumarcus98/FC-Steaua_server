import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import geoip from "geoip-lite";
import MembruFizic from "src/models/membruFizic";
import { IPinfo, LruCache, Options, IPinfoWrapper } from "node-ipinfo";
import MembruAsociat from "src/models/membruAsociat";
import { IMembruAsociat } from "src/global";
import { sendQRCodeAccountConfirmation } from "src/config/nodemailer/config";
import MembruJuridic from "src/models/membruJuridic";

const inregistrareMembruFizic: any = asyncHandler(
  async (req, res): Promise<any> => {
    if (req.method !== "POST")
      return res.status(404).json({ message: "Ceva nu a mers bine..." });
    let {
      email,
      nume,
      prenume,
      sex,
      regiune,
      tara,
      oras,
      parola,
      nrTel,
      dataNasterii,
      tipAbonament,
      membrii,
      adresa,
      semnatura,
      comenzi,
    } = req.body;

    if (!email) {
      return res
        .status(401)
        .json({ message: "Ne pare rau, emailul furnizat nu este corect." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(parola, salt);

    const userExists = await MembruFizic.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Utilizatorul exista deja..." });
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
          const user = await MembruFizic.create({
            email: email,
            parola: hashedPassword,
            comenzi: comenzi,
            tipAbonament: tipAbonament,
            nrMembru: nrMembru,
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
            sex: sex,
            nrTel: nrTel,
            dataNasterii: dataNasterii,
            oras: oras,
            semnatura: semnatura,
            tara: tara,
            nume: nume,
            prenume: prenume,
            regiune: regiune,
            membrii: membrii,
            adresa: adresa,
          });

          if (user?._id) {
            if (membrii?.length) {
              let newMembrii = membrii?.map(
                (membru: IMembruAsociat, i: number) => {
                  return {
                    ...membru,
                    nrMembru: (lMembriiFizici + lMemmbriiAsociati + 2 + i)
                      .toString()
                      .padStart(7, "0"),
                    tipAbonament: tipAbonament,
                  };
                }
              );

              await MembruAsociat.insertMany(newMembrii)
                .then(() => {
                  sendQRCodeAccountConfirmation(
                    user?.email,
                    user?.prenume,
                    user?.serieUtilizator,
                    user?.comenzi[0]?.nrComanda
                  );
                  return res.status(201).json({
                    nume: user?.nume,
                    prenume: user?.prenume,
                    email: user?.email,
                    tipAbonament: user?.tipAbonament,
                    userId: user?._id,
                    nrMembru: user?.nrMembru,
                    membrii: user?.membrii,
                    comenzi: user?.comenzi,
                    serieUtilizator: user?.serieUtilizator,
                    message: "Cont creat cu success.",
                  });
                })
                .catch((err) => res.status(401).json({ message: err }));
            } else {
              sendQRCodeAccountConfirmation(
                user?.email,
                user?.prenume,
                user?.serieUtilizator,
                user?.comenzi[0]?.nrComanda
              );
              return res.status(201).json({
                nume: user?.nume,
                prenume: user?.prenume,
                email: user?.email,
                tipAbonament: user?.tipAbonament,
                userId: user?._id,
                nrMembru: user?.nrMembru,
                membrii: user?.membrii,
                comenzi: user?.comenzi,
                serieUtilizator: user?.serieUtilizator,
                message: "Cont creat cu success.",
              });
            }
          } else {
            return res.status(201).json({ message: "Eroare." });
          }
        });
    } catch (err) {
      if (err) return res.status(201).json({ message: err });
    }
  }
);

export { inregistrareMembruFizic };
