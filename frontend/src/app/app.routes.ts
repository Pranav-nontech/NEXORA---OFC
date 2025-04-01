import { Routes } from '@angular/router';
import { ServiceSelectionComponent } from './pages/booking/service-selection/service-selection.component';
import { StaffSelectionComponent } from './pages/booking/staff-selection/staff-selection.component';
import { TimeSlotSelectionComponent } from './pages/booking/time-slot-selection/time-slot-selection.component';
import { CustomerInfoComponent } from './pages/booking/customer-info/customer-info.component';
import { ConfirmationComponent } from './pages/booking/confirmation/confirmation.component';
import { PaymentComponent } from './pages/booking/payment/payment.component';
import { SuccessComponent } from './pages/booking/success/success.component';
import { ManagementComponent } from './pages/booking/management/management.component';
import { authGuard } from './auth.guard';
import { adminRoutes } from './pages/admin/admin.routes';
import { AdminLayoutComponent } from './pages/admin/admin-layout/admin-layout.component';
import { PublicLayoutComponent } from './pages/public/public-layout/public-layout.component';
import { publicRoutes } from './pages/public/public.routes';
import { AuthLayoutComponent } from './pages/auth/auth-layout/auth-layout.component';
import { authRoutes } from './pages/auth/auth.routes';

export const routes: Routes = [
  // Public Routes
  { path: '', component: PublicLayoutComponent, children: publicRoutes },

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
  { path: 'auth', component: AuthLayoutComponent, children: authRoutes },

  // Admin Routes (Protected)
  { path: 'admin', component: AdminLayoutComponent, children: adminRoutes, canActivate: [authGuard] },

  // Wildcard
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];