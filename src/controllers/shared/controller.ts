import { NextFunction, Request, Response } from "express";
import { sendEmailResetPassword } from "./utils/password";
import { verifyEmailForgotPassword } from "./utils/verifyEmail";
import { saveNewPassword } from "./utils/savePw";

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
};
