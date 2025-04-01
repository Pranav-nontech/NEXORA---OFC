import { Routes } from "@angular/router";
import { AiConfigComponent } from "./ai-config/ai-config.component";
import { BrandingComponent } from "./branding/branding.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { CustomersComponent } from "./customers/customers.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { IntegrationsComponent } from "./integrations/integrations.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { ReportsComponent } from "./reports/reports.component";
import { ServicesComponent } from "./services/services.component";
import { SettingsComponent } from "./settings/settings.component";
import { StaffComponent } from "./staff/staff.component";
import { SystemHealthComponent } from "./system-health/system-health.component";

export const adminRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'ai-config', component: AiConfigComponent },
      { path: 'branding', component: BrandingComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'integrations', component: IntegrationsComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'staff', component: StaffComponent },
      { path: 'system-health', component: SystemHealthComponent },
]