import asyncHandler from "express-async-handler";
import MembruFizic from "src/models/membruFizic";

export const verificareFizic: any = asyncHandler(
  async (req, res): Promise<any> => {
    let utilizator = await MembruFizic.findOne({
      email: req.body.email,
    });

    if (utilizator?._id)
      return res.status(403).json({ message: "Utilizatorul exista deja." });

    utilizator = await MembruFizic.findOne({
      nrTel: req?.body?.nrTel?.split(" ")?.join(""),
    });

    if (utilizator?._id)
      return res.status(403).json({ message: "Utilizatorul exista deja." });

    return res.status(201).json({ validUser: true });
  }
);
