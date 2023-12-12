import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { config } from "src/config/config";
import { sendVerificationCodeRegister } from "src/config/nodemailer/config";
import TokenEmailOTP from "src/models/tokenEmail";

export const sendEmailOTPFizic: any = asyncHandler(
  async (req, res): Promise<any> => {
    const { email } = req.body;

    if (!email) {
      return res.status(401).json({ message: "Email-ul este necesar." });
    }

    let number = Math.floor(100000 + Math.random() * 900000);
    let tokenNew = jwt.sign({ email }, config.jsonwebtoken, {
      expiresIn: "1m",
    });

    let findToken = await TokenEmailOTP.findOne({
      email: email,
    });
    if (findToken) {
      await TokenEmailOTP.findOneAndDelete({
        email: email,
      }).then(async () => {
        return res.status(401).json({
          message: "Un email a mai fost trimis deja, te rog reincearca.",
        });
      });
    } else {
      let token = await TokenEmailOTP.create({
        email: email,
        number: number,
        token: tokenNew,
      });
      if (token) {
        sendVerificationCodeRegister(email, number.toString())
          .then(() => res.status(201).json({ message: "Email a fost trimis." }))
          .catch(() => res.status(404).json({ message: "error" }));
      }
    }
  }
);
