import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { config } from "src/config/config";
import {
  sendPasswordForgotEmail,
  sendVerificationCode,
} from "src/config/nodemailer/config";
import MembruFizic from "src/models/membruFizic";
import MembruJuridic from "src/models/membruJuridic";
import TokenEmailOTP from "src/models/tokenEmail";
import TokenResetPwFizic from "src/models/tokenResetPwFizic";

const sendEmailOTPFizic: any = asyncHandler(
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
        sendVerificationCode(email, number.toString())
          .then(() => res.status(201).json({ message: "Email a fost trimis." }))
          .catch(() => res.status(404).json({ message: "error" }));
      }
    }
  }
);

const sendEmailOTPJuridic: any = asyncHandler(
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

    if (!findToken) {
      let token = await TokenEmailOTP.create({
        email: email,
        number: number,
        token: tokenNew,
      });
      if (token) {
        sendVerificationCode(email, number.toString())
          .then(() => res.status(201).json({ message: "Email a fost trimis." }))
          .catch(() => res.status(404).json({ message: "error" }));
      }
    } else {
      await TokenEmailOTP.findOneAndDelete({
        email: email,
      }).then(async () => {
        let token = await TokenEmailOTP.create({
          email: email,
          number: number,
          token: tokenNew,
        });
        if (token) {
          sendVerificationCode(email, number.toString())
            .then(() =>
              res.status(201).json({ message: "Email a fost trimis." })
            )
            .catch(() => res.status(404).json({ message: "error" }));
        }
      });
    }
  }
);

const verifyOTPEmailFizic: any = asyncHandler(
  async (req, res): Promise<any> => {
    const { number, email } = req.body;

    if (!email) {
      return res.status(401).json({ message: "Email-ul este necesar." });
    }

    if (!number) {
      return res.status(401).json({ message: "OTP-ul este necesar." });
    }

    let findToken = await TokenEmailOTP.findOne({
      email: email,
      number: number,
    });

    if (findToken) {
      return res.status(201).json({ message: "Valid", isValid: true });
    } else {
      return res.status(403).json({ message: "Cod invalid", isValid: false });
    }
  }
);

const verifyOTPEmailJuridic: any = asyncHandler(
  async (req, res): Promise<any> => {
    const { number, email } = req.body;

    if (!email) {
      return res.status(401).json({ message: "Email-ul este necesar." });
    }

    if (!number) {
      return res.status(401).json({ message: "OTP-ul este necesar." });
    }

    let findToken = await TokenEmailOTP.findOne({
      email: email,
      number: number,
    });

    if (findToken) {
      return res.status(201).json({ message: "Valid", isValid: true });
    } else {
      return res.status(403).json({ message: "Cod invalid", isValid: false });
    }
  }
);

const verifySerieUtilizator: any = asyncHandler(
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

const sendEmailResetPassword: any = asyncHandler(
  async (req, res): Promise<any> => {
    const { email } = req.body;

    if (!email) {
      return res.status(401).json({ message: "Email invalid." });
    }

    const userExists = await MembruFizic.findOne({ email });

    if (userExists) {
      let tokenForgot = jwt.sign({ email }, config.jsonwebtoken, {
        expiresIn: "10m",
      });
      let findToken = await TokenResetPwFizic.findOne({
        userId: userExists?._id,
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
          userId: userExists?._id,
          token: tokenForgot,
          email: email,
        });
        sendPasswordForgotEmail(
          userExists?.email,
          token.token,
          token.userId,
          userExists?.prenume
        )
          .then(() =>
            res
              .status(201)
              .json({ message: "Email-ul de confirmare a fost trimis." })
          )
          .catch(() => res.status(404).json({ message: "error" }));
      }
    } else
      return res.status(401).json({ message: "Email-ul nu a fost gasit." });
  }
);

const verifyEmailForgotPassword: any = asyncHandler(
  async (req, res): Promise<any> => {
    MembruFizic.findOne({
      _id: req?.params?.userId,
    })
      .then(async (user) => {
        let tokenReset = await TokenResetPwFizic.findOne({
          userId: user?._id,
          token: req?.params?.tokenId,
        });

        if (!tokenReset) return res.status(401).send({ message: "Invalid." });

        await TokenResetPwFizic.findByIdAndDelete(tokenReset?._id)
          .then(() => res.status(201).json({ isValid: true }))
          .catch(() => res.status(401).send({ message: "Invalid." }));
      })
      .catch(() => res.status(500).json({ message: "Invalid." }));
  }
);

const saveNewPassword: any = asyncHandler(
  async (req, res): Promise<any> => {
    const { parola } = req.body;
    const user = await MembruFizic.findById(req.params.userId);
    if (user) {
      if (parola) {
        user.password = parola;
        user
          .save()
          .then(() =>
            res
              .status(201)
              .send({ message: "Parola a fost modificata cu success." })
          )
          .catch((err) =>
            res.status(401).send({ message: err?.message || "Invalid" })
          );
      } else res.status(404).json({ message: "Parola incorecta." });
    } else res.status(404).json({ message: "Membrul nu a fost gasit." });
  }
);

export {
  sendEmailOTPFizic,
  sendEmailOTPJuridic,
  verifyOTPEmailFizic,
  verifyOTPEmailJuridic,
  verifySerieUtilizator,
  sendEmailResetPassword,
  verifyEmailForgotPassword,
  saveNewPassword,
};
