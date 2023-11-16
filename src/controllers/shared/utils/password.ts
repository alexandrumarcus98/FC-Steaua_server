import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { config } from "src/config/config";
import { sendPasswordForgotEmail } from "src/config/nodemailer/config";
import MembruFizic from "src/models/membruFizic";
import MembruJuridic from "src/models/membruJuridic";
import TokenResetPwFizic from "src/models/tokenResetPwFizic";

export const sendEmailResetPassword: any = asyncHandler(
  async (req, res): Promise<any> => {
    const { email } = req.body;

    if (!email) {
      return res.status(401).json({ message: "Email invalid." });
    }

    const membruFizic = await MembruFizic.findOne({ email });

    if (membruFizic) {
      let tokenForgot = jwt.sign({ email }, config.jsonwebtoken, {
        expiresIn: "10m",
      });
      let findToken = await TokenResetPwFizic.findOne({
        userId: membruFizic?._id,
        email: email,
      });

      if (findToken) {
        await TokenResetPwFizic.findByIdAndDelete(findToken?._id).catch(() =>
          res.status(401).send({ message: "Token invalid sau expirat." })
        );
        return res.status(401).json({
          message: "Un email a mai fost trimis deja, te rog reincearca.",
        });
      } else {
        let token = await TokenResetPwFizic.create({
          userId: membruFizic?._id,
          token: tokenForgot,
          email: email,
        });
        sendPasswordForgotEmail(
          membruFizic?.email,
          token.token,
          token.userId,
          membruFizic?.prenume
        )
          .then(() =>
            res
              .status(201)
              .json({ message: "Email-ul de confirmare a fost trimis." })
          )
          .catch(() => res.status(404).json({ message: "error" }));
      }
    } else {
      const membruJuridic = await MembruJuridic.findOne({ email });

      if (membruJuridic) {
        let tokenForgot = jwt.sign({ email }, config.jsonwebtoken, {
          expiresIn: "10m",
        });
        let findToken = await TokenResetPwFizic.findOne({
          userId: membruJuridic?._id,
          email: email,
        });

        if (findToken) {
          await TokenResetPwFizic.findByIdAndDelete(findToken?._id).catch(() =>
            res.status(401).send({ message: "Token invalid sau expirat." })
          );
          return res.status(401).json({
            message: "Un email a mai fost trimis deja, te rog reincearca.",
          });
        } else {
          let token = await TokenResetPwFizic.create({
            userId: membruJuridic?._id,
            token: tokenForgot,
            email: email,
          });
          sendPasswordForgotEmail(
            membruJuridic?.emailCompanie,
            token.token,
            token.userId,
            membruJuridic?.prenume
          )
            .then(() =>
              res
                .status(201)
                .json({ message: "Email-ul de confirmare a fost trimis." })
            )
            .catch(() => res.status(404).json({ message: "error" }));
        }
      }
      return res.status(401).json({ message: "Email-ul nu a fost gasit." });
    }
  }
);
