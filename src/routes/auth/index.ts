import express, { Router } from 'express';
import { inregistrareMembru } from 'src/controllers/auth/inregistrare';
import { logareMembru } from 'src/controllers/auth/logare';
const router: Router = express.Router();
router
	.route('/inregistrare')
	.post(inregistrareMembru);

router
	.route('/logare')
	.post(logareMembru);

export default router
