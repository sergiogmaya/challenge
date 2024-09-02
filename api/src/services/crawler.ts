import puppeteer from 'puppeteer';
import { IJob } from '../models/Job';

export class CrawlerService {
  async startCrawling(job: IJob): Promise<void> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const visitedUrls = new Set<string>();
    const pendingUrls = [job.rootUrl];
    
    job.status = 'in-progress';
    await job.save();

    while (pendingUrls.length > 0) {
      const currentUrl = pendingUrls.shift()!;
      if (visitedUrls.has(currentUrl)) continue;

      await page.goto(currentUrl, { waitUntil: 'networkidle2' });
      visitedUrls.add(currentUrl);

      const foundUrls = await page.evaluate(() => {
        const anchors = document.querySelectorAll('a');
        return Array.from(anchors).map(anchor => anchor.href);
      });

      for (const url of foundUrls) {
        if (!visitedUrls.has(url) && !pendingUrls.includes(url)) {
          pendingUrls.push(url);
        }
      }

      job.urlsFound.push(currentUrl);
      job.pendingUrls = pendingUrls;
      await job.save();
    }

    job.status = 'completed';
    await job.save();

    await browser.close();
  }
}
