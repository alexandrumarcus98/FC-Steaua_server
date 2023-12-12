import asyncHandler from "express-async-handler";
import MembruFizic from "src/models/membruFizic";
import MembruJuridic from "src/models/membruJuridic";
import { json2csv } from "json-2-csv";

export const exportCSVFizic: any = asyncHandler(
  async (req, res): Promise<any> => {
    let membriiFizici = await MembruFizic.find();

    if (membriiFizici.length) {
      let membriiNoi = [];
      membriiFizici.forEach((user) => {
        const {
          nume,
          email,
          serieUtilizator,
          nrTel,
          tipAbonament,
          membrii,
          nrMembru,
        } = user;
        let totiMembrii = membrii?.length
          ? membrii.map((k) => k.emailAsociat).join(", ")
          : null;
        membriiNoi.push({
          serieUtilizator,
          nume,
          totiMembrii,
          email,
          tipAbonament,
          nrTel,
          nrMembru,
        });
      });
      const csv = json2csv(membriiNoi, {});
      if (csv) return res.status(200).attachment("usersData.csv").send(csv);
    } else return res.status(201).json([]);
  }
);

export const exportCSVJuridic: any = asyncHandler(
  async (req, res): Promise<any> => {
    let membriiJuridici = await MembruJuridic.find();

    if (membriiJuridici.length) {
      let membriiNoi = [];
      membriiJuridici.forEach((user) => {
        const {
          nume,
          emailCompanie,
          serieUtilizator,
          nrTelCompanie,
          tipAbonament,
        } = user;
        membriiNoi.push({
          serieUtilizator,
          nume,
          emailCompanie,
          nrTelCompanie,
          tipAbonament,
        });
      });
      const csv = json2csv(membriiNoi, {});
      if (csv) return res.status(200).attachment("usersData.csv").send(csv);
    } else return res.status(201).json([]);
  }
);
