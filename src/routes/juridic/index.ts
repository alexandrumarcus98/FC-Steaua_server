import express, { Router } from "express";
import { controller as controllerJuridic } from "src/controllers/membruJuridic/controller";
import rateLimitMiddlewareMail from "src/utils/limiters";
const router: Router = express.Router();
router.route("/data").post(controllerJuridic.detalii);
router.route("/verificare").post(controllerJuridic.verificare);
router.route("/verificare/:serie").post(controllerJuridic.verificareSerie);
router.route("/:id").delete(controllerJuridic.destroy);
router
  .route("/creareCont/trimite")
  .post(rateLimitMiddlewareMail, controllerJuridic.sendOTP);
router.route("/creareCont/verificare").post(controllerJuridic.verifyOTP);
router.route("/locatii").post(controllerJuridic.locatieUseri);

export default router;
