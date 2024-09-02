import { Request, Response } from 'express';
import { Job } from '../models/Job';
import { CrawlerService } from '../services/crawler';

const crawlerService = new CrawlerService();

export const createJob = async (req: Request, res: Response): Promise<void> => {
  const { url } = req.body;
  const userId = req.user!.id;  // `req.user` viene del middleware de autenticación

  const job = new Job({ userId, rootUrl: url, status: 'pending', urlsFound: [], pendingUrls: [url] });
  await job.save();

  res.status(201).json(job);

  // Iniciar el proceso de crawling en segundo plano
  crawlerService.startCrawling(job).catch((error) => console.error(error));
};

export const getJobStatus = async (req: Request, res: Response): Promise<void> => {
  const { jobId } = req.params;
  const job = await Job.findById(jobId);

  if (!job) {
    res.status(404).json({ message: 'Job not found' });
    return;
  }

  res.status(200).json(job);
};

export const getJobs = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user!.id;
  const jobs = await Job.find({ userId });

  res.status(200).json(jobs);
};
