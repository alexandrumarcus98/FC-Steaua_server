import express, { Router } from 'express';
import { status } from '../../controllers/status'
const router: Router = express.Router();
router
	.route('/')
	.post(status);

export default router
