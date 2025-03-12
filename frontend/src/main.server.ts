import { enableProdMode, isDevMode } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config.server';

if (!isDevMode()) {
  enableProdMode();
}

// Export the SSR bootstrap function
export default async function bootstrap() {
  return await bootstrapApplication(AppComponent, {
    providers: [
      ...appConfig.providers,
      provideServerRendering() // Enable SSR
    ]
  });
}