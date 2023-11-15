import asyncHandler from "express-async-handler";
import geoip from "geoip-lite";
import MembruFizic from "src/models/membruFizic";
import MembruAsociat from "src/models/membruAsociat";
import { IMembruAsociat } from "src/global";
import { sendQRCodeAccountConfirmation } from "src/config/nodemailer/config";
import MembruJuridic from "src/models/membruJuridic";
import NodeGeocoder from "node-geocoder";

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
    const geocoder = NodeGeocoder({
      provider: "mapbox",
      formatter: null,
      apiKey:
        "pk.eyJ1IjoiYWxleG1hcmN1czIyIiwiYSI6ImNsb3Jkc2N4eTB2bXMyaWxxaG84YXpndnMifQ.PjXdzSABI9li2ojsqFPr8w",
    });

    if (!email) {
      return res
        .status(401)
        .json({ message: "Ne pare rau, emailul furnizat nu este corect." });
    }

    const userExists = await MembruFizic.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Utilizatorul exista deja..." });
    }

    try {
      const response = await geocoder?.geocode(
        `${adresa}, ${oras}, ${regiune}, ${tara}`
      );
      const membriiFizici = await MembruFizic.find({});
      const membriiAsociati = await MembruAsociat.find({});
      const membriiJuridici = await MembruJuridic.find({});
      const lMembriiFizici = membriiFizici?.length;
      const lMemmbriiAsociati = membriiAsociati.length;
      const lMembriiJuridici = membriiJuridici.length;
      let nrMembru = (lMembriiFizici + lMemmbriiAsociati + lMembriiJuridici + 1)
        .toString()
        .padStart(7, "0");
      const user = await MembruFizic.create({
        parola: parola,
        email: email,
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
          location: response[0] || null,
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

      user.save();

      if (user?._id) {
        if (membrii?.length) {
          let newMembrii = await Promise.all(
            membrii?.map(async (membru: IMembruAsociat, i: number) => {
              const response = await geocoder?.geocode(
                `${membru.adresaAsociat}`
              );
              if (response[0])
                return {
                  ...membru,
                  nrMembru: (
                    lMembriiFizici +
                    lMemmbriiAsociati +
                    lMembriiJuridici +
                    2 +
                    i
                  )
                    .toString()
                    .padStart(7, "0"),
                  tipAbonament: tipAbonament,
                  locatie: response[0] || null,
                };
              else
                return {
                  ...membru,
                  nrMembru: (
                    lMembriiFizici +
                    lMemmbriiAsociati +
                    lMembriiJuridici +
                    2 +
                    i
                  )
                    .toString()
                    .padStart(7, "0"),
                  tipAbonament: tipAbonament,
                };
            })
          );

          if (newMembrii)
            await MembruAsociat.insertMany(newMembrii)
              .then(() => {
                sendQRCodeAccountConfirmation(
                  user?.tipAbonament,
                  user?.nrMembru,
                  user?.nume,
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
            user?.tipAbonament,
            user?.nrMembru,
            user?.nume,
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
    } catch (err) {
      if (err) return res.status(201).json({ message: err });
    }
  }
);

export { inregistrareMembruFizic };
