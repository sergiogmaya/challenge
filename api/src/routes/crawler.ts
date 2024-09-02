import express from 'express';
import { createJob, getJobStatus, getJobs, startCrawling } from '../controllers/crawler';
import { authMiddleware } from '../middlewares/auth';

const router = express.Router();

//Definicion de rutas del crawler
router.use(authMiddleware);  // Requiere autenticación para todas las rutas
router.post('/jobs', createJob);
router.post('/jobs/:jobId/start', authMiddleware, startCrawling);
router.get('/jobs/:jobId', getJobStatus);
router.get('/jobs', getJobs);

export default router;
