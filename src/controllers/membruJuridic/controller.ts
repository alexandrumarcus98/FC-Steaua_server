import { NextFunction, Request, Response } from "express";
import { inregistrareMembruJuridicByEmail } from "./utils/registerByEmail";
import MembruJuridic from "src/models/membruJuridic";
import { detaliiMembruJuridic } from "./utils/detalii";
import { verificareJuridic } from "./utils/verificare";
import { sendEmailOTPFizic } from "./email/sendOTP";
import { verificareEmail } from "./email/verify";
import { locatieUseri } from "./utils/locatie";

export const controller = {
  destroy: async (req: Request, res: Response) => {
    if (req.method !== "DELETE")
      return res.status(404).json({ message: "Ceva nu a mers bine..." });
    const membru = await MembruJuridic.findOne({ _id: req?.params?.id });
    if (membru)
      await membru
        ?.deleteOne()
        ?.then(() => {
          return res.send({ success: true });
        })
        .catch((e) => {
          return res.status(401);
        });
    else {
      return res.status(404).json({ message: "Nu a fost gasit." });
    }
  },
  create: (req: Request, res: Response, next: NextFunction) => {
    return inregistrareMembruJuridicByEmail(req, res, next);
  },
  detalii: (req: Request, res: Response, next: NextFunction) => {
    return detaliiMembruJuridic(req, res, next);
  },
  verificare: (req: Request, res: Response, next: NextFunction) => {
    return verificareJuridic(req, res, next);
  },
  sendOTP: (req: Request, res: Response, next: NextFunction) => {
    return sendEmailOTPFizic(req, res, next);
  },
  verifyOTP: (req: Request, res: Response, next: NextFunction) => {
    return verificareEmail(req, res, next);
  },
  locatieUseri: (req: Request, res: Response, next: NextFunction) => {
    return locatieUseri(req, res, next);
  },
};
