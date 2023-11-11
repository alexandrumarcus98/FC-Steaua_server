import express, { Router } from 'express';
import { inregistrareMembruFizic } from 'src/controllers/auth/inregistrare/membruFizic';
import { inregistrareMembruJuridic } from 'src/controllers/auth/inregistrare/membruJuridic';
import { logareMembruFizic } from 'src/controllers/auth/logare/membruFizic';
import { sendEmailOTPFizic, sendEmailOTPJuridic, verifyOTPEmailFizic, verifyOTPEmailJuridic, verifySerieUtilizator, } from 'src/controllers/auth/verification';
const router: Router = express.Router();
router
	.route('/inregistrare/fizic')
	.post(inregistrareMembruFizic);

router
	.route('/inregistrare/juridic')
	.post(inregistrareMembruJuridic);

router
	.route('/verificare/fizic/:serie')
	.post(verifySerieUtilizator);

router
	.route('/logare/fizic')
	.post(logareMembruFizic);

router
	.route('/emailMsg/fizic/trimite')
	.post(sendEmailOTPFizic)

router
	.route('/emailMsg/juridic/trimite')
	.post(sendEmailOTPJuridic)

router
	.route('/emailMsg/fizic/verificare')
	.post(verifyOTPEmailFizic)

router
	.route('/emailMsg/fizic/verificare')
	.post(verifyOTPEmailJuridic)

export default router
