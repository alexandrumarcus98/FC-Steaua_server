import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { config } from "src/config/config";
import MembruJuridic from "src/models/membruJuridic";

const logareMembruJuridic: any = asyncHandler(
  async (req, res): Promise<any> => {
    const { email, parola } = req.body;
    const user = await MembruJuridic.findOne({ email });
    if (!user?._id) return res.status(400).send("Niciun cont nu a fost gasit.");
    if (user && (await user.verifyPassword(parola))) {
      const token = jwt.sign({ userId: user.id }, config.jsonwebtoken);

      return res.send({
        token: token,
        data: {
          nume: user?.nume,
          prenume: user?.prenume,
          email: user?.emailCompanie,
          tip: "juridic",
          adresa: user?.sediuSocial,
          tipAbonament: user?.tipAbonament,
          userId: user?._id,
          nrMembru: user?.nrMembru,
          comenzi: user?.comenzi,
          serieUtilizator: user?.serieUtilizator,
        },
      });
    }
  }
);

export { logareMembruJuridic };
