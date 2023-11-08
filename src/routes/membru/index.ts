import express, { Router } from 'express';
import { detaliiMembruFizic } from 'src/controllers/auth/membruFizic';
import { detaliiMembruJuridic } from 'src/controllers/auth/membruJuridic';
const router: Router = express.Router();
router
	.route('/data/fizic')
	.post(detaliiMembruFizic);

router
	.route('/data/juridic')
	.post(detaliiMembruJuridic);

export default router
