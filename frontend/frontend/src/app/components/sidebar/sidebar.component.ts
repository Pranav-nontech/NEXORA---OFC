import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  routes = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: 'fa-home' },
    { name: 'AI Config', path: '/admin/ai-config', icon: 'fa-robot' },
    { name: 'Branding', path: '/admin/branding', icon: 'fa-palette' },
    { name: 'Calendar', path: '/admin/calendar', icon: 'fa-calendar' },
    { name: 'Customers', path: '/admin/customers', icon: 'fa-users' },
    { name: 'Integrations', path: '/admin/integrations', icon: 'fa-plug' },
    { name: 'Notifications', path: '/admin/notifications', icon: 'fa-bell' },
    { name: 'Reports', path: '/admin/reports', icon: 'fa-chart-bar' },
    { name: 'Services', path: '/admin/services', icon: 'fa-tools' },
    { name: 'Settings', path: '/admin/settings', icon: 'fa-cog' },
    { name: 'Staff', path: '/admin/staff', icon: 'fa-user-tie' },
    { name: 'System Health', path: '/admin/system-health', icon: 'fa-heartbeat' },
  ];
}