import { NextFunction, Request, Response } from "express";
import MembruFizic from "src/models/membruFizic";
import { inregistrareMembruFizicByEmail } from "./utils/registerByEmail";
import { detaliiMembruFizic } from "./utils/detalii";
import { verificareFizic } from "./utils/verificare";
import { verificareSerie } from "./utils/verifySerie";
import { sendEmailOTPFizic } from "./email/sendOTP";
import { verificareEmail } from "./email/verify";
import { locatieUseri } from "./utils/locatie";

export const controller = {
  destroy: async (req: Request, res: Response) => {
    if (req.method !== "DELETE")
      return res.status(404).json({ message: "Ceva nu a mers bine..." });
    const membru = await MembruFizic.findOne({ _id: req?.params?.id });
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
    return inregistrareMembruFizicByEmail(req, res, next);
  },
  detalii: (req: Request, res: Response, next: NextFunction) => {
    return detaliiMembruFizic(req, res, next);
  },
  verificare: (req: Request, res: Response, next: NextFunction) => {
    return verificareFizic(req, res, next);
  },
  verificareSerie: (req: Request, res: Response, next: NextFunction) => {
    return verificareSerie(req, res, next);
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
