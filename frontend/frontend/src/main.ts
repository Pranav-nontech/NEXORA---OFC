import { bootstrapApplication } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config'; // Import appConfig
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, appConfig) // Use appConfig
  .then(async () => {
    if (typeof window !== 'undefined') {
      const aosModule = await import('aos');
      const AOS = aosModule.default || aosModule; // Handle ES module default export
      AOS.init({ duration: 1000, once: true });
      console.log('AOS initialized'); // Debug

      const scriptLoaders = [
        '/assets/scripts/bootstrap.bundle.min.js',
        '/assets/scripts/glightbox.min.js',
        '/assets/scripts/imagesloaded.pkgd.min.js',
        '/assets/scripts/isotope.pkgd.min.js',
        '/assets/scripts/swiper-bundle.min.js'
      ];
      for (const src of scriptLoaders) {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onerror = () => console.error(`Failed to load script: ${src}`);
        script.onload = () => console.log(`Loaded script: ${src}`);
        document.body.appendChild(script);
      }
    }
  })
  .catch(err => console.error('Bootstrap error:', err));