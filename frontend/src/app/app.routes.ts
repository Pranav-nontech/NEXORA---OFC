import { Routes } from '@angular/router';
import { HomeComponent } from './pages/public/home/home.component';
import { AboutComponent } from './pages/public/about/about.component';
import { ContactComponent } from './pages/public/contact/contact.component';
import { FeaturesComponent } from './pages/public/features/features.component';
import { PricingComponent } from './pages/public/pricing/pricing.component';
import { FaqComponent } from './pages/public/faq/faq.component';
import { PrivacyComponent } from './pages/public/privacy/privacy.component';
import { TermsComponent } from './pages/public/terms/terms.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },              // Default route (landing page)
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'terms', component: TermsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }   // Wildcard redirects to home
];