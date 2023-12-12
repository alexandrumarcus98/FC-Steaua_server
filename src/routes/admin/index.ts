import express, { Router } from "express";
import { controller as controllerAdmin } from "src/controllers/admin/controller";
import rateLimitMiddlewareMail from "src/utils/limiters";
const router: Router = express.Router();

router.route("/trimite").post(rateLimitMiddlewareMail, controllerAdmin.sendOTP);
router.route("/verificare").post(controllerAdmin.verifyOTP);
router.route("/verificare/:id").post(controllerAdmin.verifyToken);
router.route("/export/csv/fizic").get(controllerAdmin.exportCSVFizic);
router.route("/export/csv/juridic").get(controllerAdmin.exportCSVJuridic);

export default router;
