import asyncHandler from "express-async-handler";
import MembruJuridic from "src/models/membruJuridic";

export const verificareJuridic: any = asyncHandler(
  async (req, res): Promise<any> => {
    let utilizator = await MembruJuridic.findOne({
      emailCompanie: req.body.email,
    });

    if (utilizator?._id)
      return res.status(403).json({ message: "Utilizatorul exista deja." });

    utilizator = await MembruJuridic.findOne({
      nrTel: req?.body?.nrTel?.split(" ")?.join(""),
    });

    if (utilizator?._id)
      return res.status(403).json({ message: "Utilizatorul exista deja." });

    return res.status(201).json({ validUser: true });
  }
);
