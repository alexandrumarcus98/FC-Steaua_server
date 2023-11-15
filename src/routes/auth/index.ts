import express, { Router } from "express";
import { inregistrareMembruJuridic } from "src/controllers/auth/inregistrare/membruJuridic";
import { logareMembruFizic } from "src/controllers/auth/logare/membruFizic";
import { controller } from "src/controllers/auth/membruFizic/controller";
import {
  saveNewPassword,
  sendEmailOTPFizic,
  sendEmailOTPJuridic,
  sendEmailResetPassword,
  verifyEmailForgotPassword,
  verifyOTPEmailFizic,
  verifyOTPEmailJuridic,
  verifySerieUtilizator,
} from "src/controllers/auth/verification";
import rateLimitMiddlewareMail from "src/utils/limiters";
const router: Router = express.Router();
router.route("/inregistrare/fizic").post(controller.create);
router.route("/stergeMembru/:id").post(controller.destroy);

router.route("/inregistrare/juridic").post(inregistrareMembruJuridic);

router.route("/verificare/fizic/:serie").post(verifySerieUtilizator);

router.route("/logare/fizic").post(logareMembruFizic);

router
  .route("/emailMsg/fizic/trimite")
  .post(rateLimitMiddlewareMail, sendEmailOTPFizic);

router.route("/emailMsg/juridic/trimite").post(sendEmailOTPJuridic);

router.route("/emailMsg/fizic/verificare").post(verifyOTPEmailFizic);

router.route("/emailMsg/juridic/verificare").post(verifyOTPEmailJuridic);

router.route("/emailMsg/fizic/recuperareParola").post(sendEmailResetPassword);
router
  .route("/emailMsg/fizic/:userId/recuperareParola/:tokenId")
  .post(verifyEmailForgotPassword);

router.route("/emailMsg/fizic/:userId/saveNewPw").post(saveNewPassword);

export default router;
