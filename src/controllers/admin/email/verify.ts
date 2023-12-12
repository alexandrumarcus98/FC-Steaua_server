import asyncHandler from "express-async-handler";
import TokenAdmin from "src/models/tokenAdmin";
import jwt from "jsonwebtoken";
import { config } from "src/config/config";

export const verificareEmail: any = asyncHandler(
  async (req, res): Promise<any> => {
    const { number, email } = req.body;

    if (!email) {
      return res.status(401).json({ message: "Email-ul este necesar." });
    }

    if (!number) {
      return res.status(401).json({ message: "OTP-ul este necesar." });
    }

    let findToken = await TokenAdmin.findOne({
      email: email,
      number: number,
    });

    if (findToken) {
      await TokenAdmin.findOneAndDelete({
        email: email,
        number: number,
        isAdmin: false,
      })
        .then(async () => {
          let tokenNew = jwt.sign({ email }, config.jsonwebtoken, {
            expiresIn: "1d",
          });
          let token = await TokenAdmin.create({
            email: email,
            token: tokenNew,
            number: "admin",
            isAdmin: true,
          });

          if (token)
            return res
              .status(201)
              .json({ message: "Valid", isValid: true, token: token?.token });
        })
        .catch((err) => {
          return res
            .status(403)
            .json({ message: "Cod invalid", isValid: false, token: "" });
        });
    } else {
      return res
        .status(403)
        .json({ message: "Cod invalid", isValid: false, token: "" });
    }
  }
);

export const verificareToken: any = asyncHandler(
  async (req, res): Promise<any> => {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({ message: "Token-ul este necesar." });
    }

    let findToken = await TokenAdmin.findOne({
      token: token,
      isAdmin: true,
    });

    if (findToken) {
      return res.status(201).json({ message: "Valid", isValid: true });
    } else {
      return res.status(403).json({ message: "Cod invalid", isValid: false });
    }
  }
);
