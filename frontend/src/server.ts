import 'zone.js/node';
import { enableProdMode } from '@angular/core';
import { renderApplication } from '@angular/platform-server';
import { provideServerRendering } from '@angular/platform-server';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import * as express from 'express';
import { join } from 'path';

if (environment.production) {
  enableProdMode();
}

const server = express();
const distFolder = join(__dirname, '../dist/frontend');

server.set('view engine', 'html');
server.set('views', distFolder);

// Serve static files from /dist/frontend
server.get('*.*', express.static(distFolder, {
  maxAge: '1y'
}));

// All regular routes use SSR
server.get('*', (req, res) => {
  renderApplication(() => bootstrap(AppComponent), {
    documentFilePath: join(distFolder, 'index.html'),
    url: req.url,
    providers: [
      provideServerRendering()
    ]
  }).then(html => res.send(html))
    .catch(err => res.status(500).send(err));
});

const port = process.env['PORT'] || 4000;
server.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});

async function bootstrap(appComponent: any) {
  const { bootstrapApplication } = await import('@angular/platform-server');
  const {routes} = await import('./app/app.routes.server');
  return bootstrapApplication(appComponent, {
    providers: [
      provideServerRendering(),
      provideRouter(routes)
    ]
  });
}

function provideRouter(routes: any) {
  throw new Error('Function not implemented.');
}
