import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { config } from "src/config/config";
import { sendVerificationCode } from "src/config/nodemailer/config";
import TokenAdmin from "src/models/tokenAdmin";

export const sendEmailOTPAdmin: any = asyncHandler(
  async (req, res): Promise<any> => {
    const { email } = req.body;

    if (!email) {
      return res.status(401).json({ message: "Email-ul este necesar." });
    }

    let number = Math.floor(100000 + Math.random() * 900000);
    let tokenNew = jwt.sign({ email }, config.jsonwebtoken, {
      expiresIn: "10m",
    });

    let findTokenAdmin = await TokenAdmin.findOne({
      email: email,
      isAdmin: true,
    });

    if (findTokenAdmin) {
      return res.status(201).json({
        isAdmin: true,
        token: findTokenAdmin.token,
      });
    } else {
      let findToken = await TokenAdmin.findOne({
        email: email,
        number: number,
        isAdmin: false,
      });
      if (findToken) {
        await TokenAdmin.findOneAndDelete({
          email: email,
          number: number,
        }).then(async () => {
          return res.status(401).json({
            message: "Un email a mai fost trimis deja, te rog reincearca.",
          });
        });
      } else {
        let token = await TokenAdmin.create({
          email: email,
          number: number,
          token: tokenNew,
          isAdmin: false,
        });
        if (token) {
          sendVerificationCode(email, number.toString())
            .then(() =>
              res.status(201).json({ message: "Email a fost trimis." })
            )
            .catch(() => res.status(404).json({ message: "error" }));
        }
      }
    }
  }
);
