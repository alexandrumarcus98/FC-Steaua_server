import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import MembruFizic from "src/models/membruFizic";
import { config } from "src/config/config";

const logareMembruFizic: any = asyncHandler(
  async (req, res): Promise<any> => {
    const { email, parola, nrTel } = req.body;
    const user = await MembruFizic.findOne({ email });
    if (!user) return res.status(400).send("Niciun cont nu a fost gasit.");
    const validPassword = await bcrypt.compare(parola, user.password);
    if (!validPassword) return res.status(400).send("Parola este gresita.");
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
  }
);

export { logareMembruFizic };
