import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideServer Rendering } from '@angular/platform-server';
import { routes } from './app.routes.server';

export const appConfigServer: ApplicationConfig = {
  providers: [
    provideRouter(routes),          // Server-side routes
    provideHttpClient(withFetch()), // HTTP client with fetch API for SSR
    provideServerRendering()        // Enables SSR functionality
  ]
};