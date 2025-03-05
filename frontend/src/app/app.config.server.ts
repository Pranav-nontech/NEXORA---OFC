import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

const mockHttpClient = {
  get: () => of([]),
  post: () => of({})
};

export const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    { provide: HttpClient, useValue: mockHttpClient }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);