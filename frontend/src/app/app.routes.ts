import { Routes } from '@angular/router';
import { HomeComponent } from './pages/public/home/home.component';
import { AboutComponent } from './pages/public/about/about.component';
import { ContactComponent } from './pages/public/contact/contact.component';
import { FeaturesComponent } from './pages/public/features/features.component';
import { PricingComponent } from './pages/public/pricing/pricing.component';
import { FaqComponent } from './pages/public/faq/faq.component';
import { PrivacyComponent } from './pages/public/privacy/privacy.component';
import { TermsComponent } from './pages/public/terms/terms.component';
import { CookieComponent } from './pages/public/cookie/cookie.component';
import { ServiceSelectionComponent } from './pages/booking/service-selection/service-selection.component';
import { StaffSelectionComponent } from './pages/booking/staff-selection/staff-selection.component';
import { TimeSlotSelectionComponent } from './pages/booking/time-slot-selection/time-slot-selection.component';
import { CustomerInfoComponent } from './pages/booking/customer-info/customer-info.component';
import { ConfirmationComponent } from './pages/booking/confirmation/confirmation.component';
import { PaymentComponent } from './pages/booking/payment/payment.component';
import { SuccessComponent } from './pages/booking/success/success.component';
import { ManagementComponent } from './pages/booking/management/management.component';
import { EmailVerificationComponent } from './pages/auth/email-verification/email-verification.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { PasswordResetComponent } from './pages/auth/password-reset/password-reset.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { AiConfigComponent } from './pages/admin/ai-config/ai-config.component';
import { BrandingComponent } from './pages/admin/branding/branding.component';
import { CalendarComponent } from './pages/admin/calendar/calendar.component';
import { CustomersComponent } from './pages/admin/customers/customers.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { IntegrationsComponent } from './pages/admin/integrations/integrations.component';
import { NotificationsComponent } from './pages/admin/notifications/notifications.component';
import { ReportsComponent } from './pages/admin/reports/reports.component';
import { ServicesComponent } from './pages/admin/services/services.component';
import { SettingsComponent } from './pages/admin/settings/settings.component';
import { StaffComponent } from './pages/admin/staff/staff.component';
import { SystemHealthComponent } from './pages/admin/system-health/system-health.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  // Public Routes
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

  // Booking Routes (Protected)
  { path: 'booking/service-selection', component: ServiceSelectionComponent, canActivate: [authGuard] },
  { path: 'booking/staff-selection', component: StaffSelectionComponent, canActivate: [authGuard] },
  { path: 'booking/time-slot-selection', component: TimeSlotSelectionComponent, canActivate: [authGuard] },
  { path: 'booking/customer-info', component: CustomerInfoComponent, canActivate: [authGuard] },
  { path: 'booking/confirmation', component: ConfirmationComponent, canActivate: [authGuard] },
  { path: 'booking/payment', component: PaymentComponent, canActivate: [authGuard] },
  { path: 'booking/success', component: SuccessComponent, canActivate: [authGuard] },
  { path: 'booking/management', component: ManagementComponent, canActivate: [authGuard] },

  // Auth Routes
  { path: 'verify-email', component: EmailVerificationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: PasswordResetComponent },
  { path: 'signup', component: SignupComponent },

  // Admin Routes (Protected)
  { path: 'admin/ai-config', component: AiConfigComponent, canActivate: [authGuard] },
  { path: 'admin/branding', component: BrandingComponent, canActivate: [authGuard] },
  { path: 'admin/calendar', component: CalendarComponent, canActivate: [authGuard] },
  { path: 'admin/customers', component: CustomersComponent, canActivate: [authGuard] },
  { path: 'admin/dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'admin/integrations', component: IntegrationsComponent, canActivate: [authGuard] },
  { path: 'admin/notifications', component: NotificationsComponent, canActivate: [authGuard] },
  { path: 'admin/reports', component: ReportsComponent, canActivate: [authGuard] },
  { path: 'admin/services', component: ServicesComponent, canActivate: [authGuard] },
  { path: 'admin/settings', component: SettingsComponent, canActivate: [authGuard] },
  { path: 'admin/staff', component: StaffComponent, canActivate: [authGuard] },
  { path: 'admin/system-health', component: SystemHealthComponent, canActivate: [authGuard] },

  // Wildcard
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];