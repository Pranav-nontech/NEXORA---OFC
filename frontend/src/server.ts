import 'zone.js/node';
import { APP_BASE_HREF } from '@angular/common';
import { renderApplication } from '@angular/platform-server';
import express from 'express';
import cookieParser from 'cookie-parser';
import { join } from 'node:path';
import bootstrap from './main.server';
import { readFileSync } from 'fs';

const app = express();
const PORT = 4200;
const distFolder = join(process.cwd(), 'dist/frontend/browser');
const indexHtmlPath = join(distFolder, 'index.html'); // Use default index.html

let indexHtml: string;
try {
  indexHtml = readFileSync(indexHtmlPath, 'utf8');
  console.log('Loaded index.html successfully');
} catch (err) {
  console.warn('index.html not found, using fallback:', err);
  indexHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Frontend</title><base href="/"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><app-root></app-root></body></html>`;
}

app.use(express.static(distFolder, { maxAge: '1y' }));
app.use(cookieParser()); // Enable cookie parsing

app.get('*', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const isAuthenticated = req.cookies && req.cookies['auth_token'] || false;
  console.log('Request URL:', req.url);
  if (!isAuthenticated && req.url !== '/login') {
    console.log('Redirecting to /login');
    res.redirect('/login');
    return;
  }
  try {
    console.log('Starting SSR render');
    const html = await renderApplication(bootstrap, {
      document: indexHtml,
      url: req.url,
      platformProviders: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: 'isAuthenticated', useValue: isAuthenticated }
      ],
    });
    console.log('SSR render completed:', html.length, 'bytes');
    res.send(html);
  } catch (err: unknown) {
    console.error('SSR Error:', err);
    res.status(500).send('Server rendering error: ' + (err instanceof Error ? err.message : String(err)));
  }
});

app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});