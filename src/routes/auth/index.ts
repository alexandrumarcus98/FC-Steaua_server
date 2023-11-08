import express, { Router } from 'express';
import { inregistrareMembruFizic } from 'src/controllers/auth/inregistrare/membruFizic';
import { inregistrareMembruJuridic } from 'src/controllers/auth/inregistrare/membruJuridic';
import { logareMembruFizic } from 'src/controllers/auth/logare/membruFizic';
const router: Router = express.Router();
router
	.route('/inregistrare/fizic')
	.post(inregistrareMembruFizic);

router
	.route('/inregistrare/juridic')
	.post(inregistrareMembruJuridic);

router
	.route('/logare/fizic')
	.post(logareMembruFizic);

export default router
