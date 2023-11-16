import express, { Router } from "express";
import { controller as controllerFizic } from "src/controllers/membruFizic/controller";
import { controller as controllerJuridic } from "src/controllers/membruJuridic/controller";
const router: Router = express.Router();

router.route("/fizic").post(controllerFizic.create);
router.route("/juridic").post(controllerJuridic.create);

export default router;
