import asyncHandler from "express-async-handler";
import geoip from "geoip-lite";
import MembruFizic from "src/models/membruFizic";
import MembruAsociat from "src/models/membruAsociat";
import { sendQRCodeAccountConfirmation } from "src/config/nodemailer/config";
import MembruJuridic from "src/models/membruJuridic";
import NodeGeocoder from "node-geocoder";
import { config } from "src/config/config";

export const inregistrareMembruJuridicByEmail: any = asyncHandler(
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
      codPostal,
      oras,
      regiune,
      tara,
      regComert,
      nrTelCompanie,
      semnatura,
      sediuSocial,
    } = req.body;

    const geocoder = NodeGeocoder({
      provider: "mapbox",
      formatter: null,
      apiKey: config.APP_GEOCODE_APIKEY,
    });

    if (!emailCompanie) {
      return res
        .status(401)
        .json({ message: "Ne pare rau, emailul furnizat nu este corect." });
    }

    const userExists = await MembruJuridic.findOne({ emailCompanie });
    if (userExists) {
      return res.status(404).json({ message: "Utilizatorul exista deja..." });
    }

    try {
      const response = await geocoder?.geocode(
        `${sediuSocial}, ${oras}, ${regiune}, ${tara}`
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
        oras: oras,
        regiune: regiune,
        tara: tara,
        codPostal: codPostal,
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
          location: response[0] || null,
        },
      });

      user.save();

      if (user?._id) {
        sendQRCodeAccountConfirmation(
          user?.tipAbonament,
          user?.nrMembru,
          user?.nume,
          user?.emailCompanie,
          user?.prenume,
          user?.serieUtilizator,
          user?.comenzi[0]?.nrComanda,
          "juridic"
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
    } catch (err) {
      if (err) return res.status(201).json({ message: err });
    }
  }
);
