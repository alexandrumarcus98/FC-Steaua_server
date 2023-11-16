import asyncHandler from "express-async-handler";
import MembruFizic from "src/models/membruFizic";
import MembruJuridic from "src/models/membruJuridic";
import TokenResetPwFizic from "src/models/tokenResetPwFizic";

export const verifyEmailForgotPassword: any = asyncHandler(
  async (req, res): Promise<any> => {
    let membruFizic = await MembruFizic.findOne({
      _id: req?.params?.userId,
    });
    if (membruFizic) {
      let tokenReset = await TokenResetPwFizic.findOne({
        userId: membruFizic?._id,
        token: req?.params?.tokenId,
      });

      if (!tokenReset) return res.status(401).send({ message: "Invalid." });

      return await TokenResetPwFizic.findByIdAndDelete(tokenReset?._id)
        .then(() => res.status(201).json({ isValid: true }))
        .catch(() => res.status(401).send({ message: "Invalid." }));
    } else {
      let membruJuridic = await MembruJuridic.findOne({
        _id: req?.params?.userId,
      });
      if (membruJuridic) {
        let tokenReset = await TokenResetPwFizic.findOne({
          userId: membruJuridic?._id,
          token: req?.params?.tokenId,
        });

        if (!tokenReset) return res.status(401).send({ message: "Invalid." });

        return await TokenResetPwFizic.findByIdAndDelete(tokenReset?._id)
          .then(() => res.status(201).json({ isValid: true }))
          .catch(() => res.status(401).send({ message: "Invalid." }));
      }
    }
  }
);
