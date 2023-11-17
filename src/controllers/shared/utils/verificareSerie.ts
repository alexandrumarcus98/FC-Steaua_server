import asyncHandler from "express-async-handler";
import MembruAsociat from "src/models/membruAsociat";
import MembruFizic from "src/models/membruFizic";
import MembruJuridic from "src/models/membruJuridic";

export const verificareSerieMembru: any = asyncHandler(
  async (req, res): Promise<any> => {
    const { serie, tip } = req.params;

    if (!(serie && tip)) return res.status(404).json({ message: "Eroare" });

    let membru = null;
    if (tip === "fizic")
      membru = await MembruFizic.findOne({
        serieUtilizator: serie,
      });

    if (tip === "juridic")
      membru = await MembruJuridic.findOne({
        serieUtilizator: serie,
      });

    if (tip === "asociat")
      membru = await MembruAsociat.findOne({
        serieUtilizator: serie,
      });

    if (membru?._id)
      return res
        .status(201)
        .json({ message: "Valid", isValid: true, user: membru });
  }
);
