import express, { Router } from 'express';
import { detaliiMembruFizic, locatieUseri, verificareUser } from 'src/controllers/auth/membruFizic';
import { detaliiMembruJuridic, verificareJuridic } from 'src/controllers/auth/membruJuridic';
const router: Router = express.Router();
router
	.route('/data/fizic')
	.post(detaliiMembruFizic);

router
	.route('/verificare/fizic')
	.post(verificareUser);

router
	.route('/locatii/fizic')
	.post(locatieUseri);

router
	.route('/data/juridic')
	.post(detaliiMembruJuridic);

router
	.route('/verificare/juridic')
	.post(verificareJuridic);

export default router
