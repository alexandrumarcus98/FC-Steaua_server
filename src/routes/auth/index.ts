import express, { Router } from 'express';
import { loginAdmin } from 'src/controllers/auth/logare';
const router: Router = express.Router();
router
	.route('/admin')
	.post(loginAdmin);

export default router
