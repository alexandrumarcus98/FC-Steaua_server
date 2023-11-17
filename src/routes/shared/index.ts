import express, { Router } from "express";
import { controller as controllerShared } from "src/controllers/shared/controller";
import rateLimitMiddlewareMail from "src/utils/limiters";
const router: Router = express.Router();
router
  .route("/recuperareParola")
  .post(rateLimitMiddlewareMail, controllerShared.trimitePwEmail);
router
  .route("/:userId/recuperareParola/:tokenId")
  .post(controllerShared.verificarePwEmail);
router
  .route("/:userId/savePw")
  .post(rateLimitMiddlewareMail, controllerShared.saveNewPW);
router
  .route("/:tip/verificare/:serie")
  .post(controllerShared.verificareSerieMembru);

export default router;
