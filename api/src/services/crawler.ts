import axios from 'axios';
import { JSDOM } from 'jsdom';
import { JobDocument } from '../models/Job';

export class CrawlerService {
  async startCrawling(job: JobDocument): Promise<string[]> {
    try {
      const { rootUrl } = job;

      // Realiza una petición a la URL raíz
      const response = await axios.get(rootUrl);
      const html = response.data;

      //Comprobamos que tenga html
      if (!html) {
        throw new Error('No HTML content received');
      }

      // Carga el HTML en jsdom
      const dom = new JSDOM(html);
      const document = dom.window.document;

      // Extrae los enlaces encontrados
      const urls: string[] = [];
      const anchorElements = document.querySelectorAll('a');

      anchorElements.forEach((element) => {
        const href = element.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
          const fullUrl = new URL(href, rootUrl).href; // Resuelve las URLs relativas
          urls.push(fullUrl);
        }
      });

      // Actualiza el job con las URLs encontradas
      job.urlsFound = urls;
      job.status = 'completed';

      // Guarda el trabajo actualizado
      await job.save();

      return urls;
    } catch (error) {
      console.error('Error during crawling:', error);
      job.status = 'failed';
      await job.save();
      throw error;
    }
  }
}
