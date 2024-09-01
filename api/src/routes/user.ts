import { Router } from 'express';
import { registerUser, loginUser, getCurrentUser } from '../controllers/user';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta para obtener la información del usuario actual (protegida)
router.get('/me', authMiddleware, getCurrentUser);

export default router;
