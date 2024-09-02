import { Request, Response } from 'express';
import { Job } from '../models/Job';
import { CrawlerService } from '../services/crawler';

//Definimos los servicios del crawler para poder consumirlos
const crawlerService = new CrawlerService();

// Crear un nuevo trabajo de crawling sin iniciarlo
export const createJob = async (req: Request, res: Response): Promise<void> => {
  const { url } = req.body;
  const userId = req.user!.id;  // `req.user` viene del middleware de autenticación

  const job = new Job({ userId, rootUrl: url, status: 'pending', urlsFound: [], pendingUrls: [url] });
  await job.save();

  res.status(201).json(job);
};

// Iniciar el proceso de crawling manualmente
export const startCrawling = async (req: Request, res: Response): Promise<void> => {
  const { jobId } = req.params;
  const job = await Job.findById(jobId);

  if (!job) {
    res.status(404).json({ message: 'Job not found' });
    return;
  }

  if (job.status !== 'pending') {
    res.status(400).json({ message: 'Job has already started or completed' });
    return;
  }

  job.status = 'in-progress';
  await job.save();

  //Llamamos a la funcion que busca los links en la web
  crawlerService.startCrawling(job)
    .then(async () => {
      job.status = 'completed';
      await job.save();
    })
    .catch(async (error) => {
      console.error(error);
      job.status = 'failed';
      await job.save();
    });

  res.status(200).json({ message: 'Crawling started', job });
};

// Obtener el estado de un trabajo específico
export const getJobStatus = async (req: Request, res: Response): Promise<void> => {
  const { jobId } = req.params;
  const job = await Job.findById(jobId);

  if (!job) {
    res.status(404).json({ message: 'Job not found' });
    return;
  }

  res.status(200).json(job);
};

// Obtener todos los trabajos del usuario
export const getJobs = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user!.id;
  const jobs = await Job.find({ userId });

  res.status(200).json(jobs);
};
