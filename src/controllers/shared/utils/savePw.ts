import asyncHandler from "express-async-handler";
import MembruFizic from "src/models/membruFizic";
import MembruJuridic from "src/models/membruJuridic";
import bcrypt from "bcryptjs";

export const saveNewPassword: any = asyncHandler(
  async (req, res): Promise<any> => {
    const { parola } = req.body;
    const membruFizic = await MembruFizic.findById(req.params.userId);
    if (membruFizic) {
      const salt = await bcrypt.genSalt(10);
      membruFizic.password = await bcrypt.hash(parola, salt);
      const pw = await bcrypt.hash(parola, salt);
      if (pw) {
        await MembruFizic.findByIdAndUpdate(membruFizic?._id, {
          password: pw,
        })
          .then(() =>
            res
              .status(201)
              .send({ message: "Parola a fost modificata cu success." })
          )
          .catch((err) =>
            res.status(401).send({ message: err?.message || "Invalid" })
          );
      }
    } else {
      const membruJuridic = await MembruJuridic.findById(req.params.userId);
      if (membruJuridic) {
        const salt = await bcrypt.genSalt(10);
        const pw = await bcrypt.hash(parola, salt);
        if (pw) {
          membruJuridic.password = pw;
          await MembruJuridic.findByIdAndUpdate(membruJuridic?._id, {
            password: pw,
          })
            .then(() =>
              res
                .status(201)
                .send({ message: "Parola a fost modificata cu success." })
            )
            .catch((err) =>
              res.status(401).send({ message: err?.message || "Invalid" })
            );
        }
      } else return res.status(404).json({ message: "Invalid." });
    }
  }
);
