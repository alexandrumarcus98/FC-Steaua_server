import { NextFunction, Request, Response } from "express";
import { sendEmailOTPAdmin } from "./email/sendOTP";
import { verificareEmail, verificareToken } from "./email/verify";
import { exportCSVFizic, exportCSVJuridic } from "./email/exportCSV";

export const controller = {
  sendOTP: (req: Request, res: Response, next: NextFunction) => {
    return sendEmailOTPAdmin(req, res, next);
  },
  verifyOTP: (req: Request, res: Response, next: NextFunction) => {
    return verificareEmail(req, res, next);
  },
  verifyToken: (req: Request, res: Response, next: NextFunction) => {
    return verificareToken(req, res, next);
  },
  exportCSVFizic: (req: Request, res: Response, next: NextFunction) => {
    return exportCSVFizic(req, res, next);
  },
  exportCSVJuridic: (req: Request, res: Response, next: NextFunction) => {
    return exportCSVJuridic(req, res, next);
  },
};
