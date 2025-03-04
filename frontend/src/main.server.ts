import { bootstrapApplication } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideServerRendering } from '@angular/platform-server';
import { routes } from './app/app.routes.server';

if (environment.production) {
  enableProdMode();
}

export default async function bootstrap() {
  const app = await bootstrapApplication(AppComponent, {
    providers: [
      provideServerRendering(),
      provideRouter(routes)
    ]
  });
  return app;
}