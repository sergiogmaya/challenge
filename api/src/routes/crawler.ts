import express from 'express';
import { createJob, getJobStatus, getJobs } from '../controllers/crawler';
import { authMiddleware } from '../middlewares/auth';

const router = express.Router();

router.use(authMiddleware);  // Requiere autenticación para todas las rutas
router.post('/jobs', createJob);
router.get('/jobs/:jobId', getJobStatus);
router.get('/jobs', getJobs);

export default router;
