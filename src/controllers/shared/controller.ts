import { NextFunction, Request, Response } from "express";
import { sendEmailResetPassword } from "./utils/password";
import { verifyEmailForgotPassword } from "./utils/verifyEmail";
import { saveNewPassword } from "./utils/savePw";
import { verificareSerieMembru } from "./utils/verificareSerie";
import { trimiteMailTest } from "./utils/trimiteMailTest";

export const controller = {
  trimitePwEmail: (req: Request, res: Response, next: NextFunction) => {
    return sendEmailResetPassword(req, res, next);
  },
  verificarePwEmail: (req: Request, res: Response, next: NextFunction) => {
    return verifyEmailForgotPassword(req, res, next);
  },
  saveNewPW: (req: Request, res: Response, next: NextFunction) => {
    return saveNewPassword(req, res, next);
  },
  verificareSerieMembru: (req: Request, res: Response, next: NextFunction) => {
    return verificareSerieMembru(req, res, next);
  },
  sendEmail: (req: Request, res: Response, next: NextFunction) => {
    return trimiteMailTest(req, res, next);
  },
};
