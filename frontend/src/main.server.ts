import { enableProdMode, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

if (!isDevMode()) {
  enableProdMode();
}

// Export the bootstrap function directly
export default async function bootstrap() {
  const app = await bootstrapApplication(AppComponent, config);
  return app; // Return the application ref
}