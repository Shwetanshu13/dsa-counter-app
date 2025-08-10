import express from 'express';
import { registerNewUser, loginUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', registerNewUser);
router.post('/login', loginUser);

export default router;
