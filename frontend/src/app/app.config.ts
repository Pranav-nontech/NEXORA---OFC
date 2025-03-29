import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth, browserLocalPersistence } from '@angular/fire/auth';
import { environment } from '@environments/environment';
import { routes } from './app.routes';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
import { getVertexAI, provideVertexAI } from '@angular/fire/vertexai';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideFirebaseApp(() => {
      console.log('Initializing Firebase app with config:', environment.firebase);
      const app = initializeApp(environment.firebase);
      console.log('Firebase app initialized:', {
        name: app.name,
        options: app.options
      });
      return app;
    }),
    provideAuth(() => {
      console.log('Providing Auth service');
      const auth = getAuth();
      auth.setPersistence(browserLocalPersistence)
        .then(() => {
          console.log('Auth persistence set to local');
        })
        .catch((error) => {
          console.error('Error setting auth persistence:', error);
        });
      console.log('Auth instance provided:', {
        appName: auth.app.name,
        config: auth.config
      });
      return auth;
    }),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideStorage(() => getStorage()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideVertexAI(() => getVertexAI())
  ]
};