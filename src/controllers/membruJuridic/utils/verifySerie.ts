import asyncHandler from "express-async-handler";
import MembruFizic from "src/models/membruFizic";
import MembruJuridic from "src/models/membruJuridic";

export const verificareSerie: any = asyncHandler(
  async (req, res): Promise<any> => {
    const { serie } = req.params;

    if (!serie) {
      return res.status(401).json({ message: "Serie necesara." });
    }

    let findMembruFizic = await MembruFizic.findOne({
      serieUtilizator: serie,
    });

    if (findMembruFizic)
      return res
        .status(201)
        .json({ message: "Valid", isValid: true, user: findMembruFizic });

    let findMembruJuridic = await MembruJuridic.findOne({
      serieUtilizator: serie,
    });

    if (findMembruJuridic) {
      return res
        .status(201)
        .json({ message: "Valid", isValid: true, user: findMembruJuridic });
    } else {
      return res.status(403).json({ message: "Cod invalid", isValid: false });
    }
  }
);
