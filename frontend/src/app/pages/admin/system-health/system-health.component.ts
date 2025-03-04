import { Component } from '@angular/core';

@Component({
  selector: 'app-system-health',
  standalone: true,
  templateUrl: './system-health.component.html',
  styleUrls: ['./system-health.component.css']
})
export class SystemHealthComponent {
  systemStatus = {
    backend: 'Online',
    lastChecked: new Date()
  };

  checkSystemHealth(): void {
    // Placeholder for health check
    this.systemStatus.lastChecked = new Date();
    console.log('System Health Checked:', this.systemStatus);
  }
}