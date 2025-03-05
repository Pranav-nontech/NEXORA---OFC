import 'zone.js/node';
import { APP_BASE_HREF } from '@angular/common';
import { renderApplication } from '@angular/platform-server';
import express from 'express';
import { join } from 'node:path';
import bootstrap from './main.server';
import { readFileSync } from 'fs';

const app = express();
const PORT = 4200;
const distFolder = join(process.cwd(), 'dist/frontend/browser');
const indexHtmlPath = join(distFolder, 'index.csr.html'); // Use index.csr.html

// Load index.html with fallback
let indexHtml: string;
try {
  indexHtml = readFileSync(indexHtmlPath, 'utf8');
  console.log('Loaded index.csr.html successfully');
} catch (err) {
  console.warn('index.csr.html not found, using fallback:', err);
  indexHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Frontend</title>
      <base href="/">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
      <app-root></app-root>
    </body>
    </html>
  `;
}

app.use(express.static(distFolder, { maxAge: '1y' }));

export const reqHandler = async (req: express.Request, res: express.Response) => {
  try {
    console.log('Rendering with index.html:', indexHtml.substring(0, 100));
    const html = await renderApplication(bootstrap, {
      document: indexHtml,
      url: req.url,
      platformProviders: [
        { provide: APP_BASE_HREF, useValue: req.baseUrl },
      ],
    });
    res.send(html);
  } catch (err: unknown) {
    console.error('SSR Error:', err);
    res.status(500).send('Server rendering error: ' + (err instanceof Error ? err.message : String(err)));
  }
};

app.get('*', reqHandler);

app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});