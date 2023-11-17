import express, { Router } from "express";
import { controller as controllerFizic } from "src/controllers/membruFizic/controller";
import rateLimitMiddlewareMail from "src/utils/limiters";
const router: Router = express.Router();
router.route("/data").post(controllerFizic.detalii);
router.route("/verificare").post(controllerFizic.verificare);
router.route("/:id").delete(controllerFizic.destroy);
router
  .route("/creareCont/trimite")
  .post(rateLimitMiddlewareMail, controllerFizic.sendOTP);
router.route("/creareCont/verificare").post(controllerFizic.verifyOTP);
router.route("/locatii").post(controllerFizic.locatieUseri);

export default router;
