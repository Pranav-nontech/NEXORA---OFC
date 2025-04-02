import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { FeaturesComponent } from "./features/features.component";
import { PricingComponent } from "./pricing/pricing.component";
import { FaqComponent } from "./faq/faq.component";
import { PrivacyComponent } from "./privacy/privacy.component";
import { TermsComponent } from "./terms/terms.component";
import { CookieComponent } from "./cookie/cookie.component";

export const publicRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'features', component: FeaturesComponent },
    { path: 'pricing', component: PricingComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'privacy', component: PrivacyComponent },
    { path: 'terms', component: TermsComponent },
    { path: 'cookie', component: CookieComponent },
]