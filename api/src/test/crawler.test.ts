/* import request from 'supertest';
import app from '../../src/index';
import { Job } from '../../src/models/Job';

jest.mock('../../src/models/Job');

describe('Crawler API', () => {
  let mockPage: any;

  beforeEach(() => {
    mockPage = {
      goto: jest.fn(),
      evaluate: jest.fn(),
    };
    (puppeteer.launch as jest.Mock).mockResolvedValue({
      newPage: jest.fn().mockResolvedValue(mockPage),
      close: jest.fn(),
    });
    (Job.prototype.save as jest.Mock).mockResolvedValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new crawling job', async () => {
    const mockUrls = ['https://example.com/page1', 'https://example.com/page2'];
    mockPage.evaluate.mockResolvedValueOnce(mockUrls); // Simula encontrar URLs

    const res = await request(app)
      .post('/api/crawler/jobs')
      .set('Authorization', `Bearer some-valid-token`)
      .send({ url: 'https://example.com' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('status', 'pending');
    expect(Job.prototype.save).toHaveBeenCalled();
  });

  it('should return 400 if no URL is provided', async () => {
    const res = await request(app)
      .post('/api/crawler/jobs')
      .set('Authorization', `Bearer some-valid-token`)
      .send({});

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', 'URL is required');
  });

  it('should return the status of a job', async () => {
    const job = {
      _id: 'job-id',
      userId: 'user-id',
      rootUrl: 'https://example.com',
      status: 'completed',
      urlsFound: ['https://example.com/page1'],
      pendingUrls: [],
      createdAt: new Date(),
    };
    (Job.findById as jest.Mock).mockResolvedValue(job);

    const res = await request(app)
      .get('/api/crawler/jobs/job-id')
      .set('Authorization', `Bearer some-valid-token`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'completed');
    expect(res.body.urlsFound).toEqual(['https://example.com/page1']);
  });

  it('should return 404 if the job is not found', async () => {
    (Job.findById as jest.Mock).mockResolvedValue(null);

    const res = await request(app)
      .get('/api/crawler/jobs/non-existent-job-id')
      .set('Authorization', `Bearer some-valid-token`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('message', 'Job not found');
  });

  it('should return a list of jobs for the logged-in user', async () => {
    const jobs = [
      {
        _id: 'job-id-1',
        userId: 'user-id',
        rootUrl: 'https://example.com',
        status: 'completed',
        urlsFound: ['https://example.com/page1'],
        pendingUrls: [],
        createdAt: new Date(),
      },
      {
        _id: 'job-id-2',
        userId: 'user-id',
        rootUrl: 'https://another-example.com',
        status: 'in-progress',
        urlsFound: ['https://another-example.com/page1'],
        pendingUrls: ['https://another-example.com/page2'],
        createdAt: new Date(),
      },
    ];
    (Job.find as jest.Mock).mockResolvedValue(jobs);

    const res = await request(app)
      .get('/api/crawler/jobs')
      .set('Authorization', `Bearer some-valid-token`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toHaveProperty('status', 'completed');
    expect(res.body[1]).toHaveProperty('status', 'in-progress');
  });
});
 */