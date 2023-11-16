import express, { Router } from "express";
import { logareMembruFizic } from "src/controllers/auth/logare/membruFizic";
import { logareMembruJuridic } from "src/controllers/auth/logare/membruJuridic";
const router: Router = express.Router();

router.route("/fizic").post(logareMembruFizic);
router.route("/juridic").post(logareMembruJuridic);

export default router;
