import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import MembruFizic from "src/models/membruFizic";
import { config } from "src/config/config";

const logareMembruFizic: any = asyncHandler(
  async (req, res, next): Promise<any> => {
    const {
      email,
      parola,
    }: {
      email: string;
      parola: string;
    } = req.body;
    const user = await MembruFizic.findOne({ email });
    if (!user?._id) return res.status(400).send("Niciun cont nu a fost gasit.");
    if (user && (await user.verifyPassword(parola))) {
      const token = jwt.sign({ userId: user.id }, config.jsonwebtoken);

      return res.status(201).send({
        token: token,
        data: {
          tip: "juridic",
          nume: user?.nume,
          prenume: user?.prenume,
          email: user?.email,
          tipAbonament: user?.tipAbonament,
          userId: user?._id,
          nrMembru: user?.nrMembru,
          membrii: user?.membrii,
          comenzi: user?.comenzi,
          serieUtilizator: user?.serieUtilizator,
          adresa: user?.adresa,
          nrTel: user?.nrTel,
          dataNasterii: user?.dataNasterii,
        },
      });
    }
    return res.status(401).json("Parolă greșită.");
  }
);

export { logareMembruFizic };
