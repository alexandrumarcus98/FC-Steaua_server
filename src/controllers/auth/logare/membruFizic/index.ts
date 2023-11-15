import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import MembruFizic from "src/models/membruFizic";
import { config } from "src/config/config";
import bcrypt from "bcrypt";

const logareMembruFizic: any = asyncHandler(
  async (req, res): Promise<any> => {
    const {
      email,
      parola,
    }: {
      email: string;
      parola: string;
    } = req.body;
    const user = await MembruFizic.findOne({ email });
    if (!user._id) return res.status(400).send("Niciun cont nu a fost gasit.");
    try {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign({ userId: user.id }, config.jsonwebtoken);

        return res.send({
          token: token,
          data: {
            nume: user?.nume,
            prenume: user?.prenume,
            email: user?.email,
            tipAbonament: user?.tipAbonament,
            userId: user?._id,
            nrMembru: user?.nrMembru,
            membrii: user?.membrii,
            comenzi: user?.comenzi,
            serieUtilizator: user?.serieUtilizator,
          },
        });
      } else {
        return res.status(400).send("Parola este gresita.");
      }
    } catch {
      return res.status(400).send("Parola este gresita.");
    }
  }
);

export { logareMembruFizic };
