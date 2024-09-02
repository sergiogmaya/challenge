import { Router } from 'express';
import { registerUser, loginUser, getCurrentUser } from '../controllers/user';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

// Definicion de rutas para el usuario
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware, getCurrentUser);

export default router;
