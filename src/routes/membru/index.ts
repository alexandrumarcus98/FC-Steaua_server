import express, { Router } from 'express';
import { detaliiMembru } from 'src/controllers/auth/membru';
const router: Router = express.Router();
router
	.route('/data')
	.post(detaliiMembru);

export default router
