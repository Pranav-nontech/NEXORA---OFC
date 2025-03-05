import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-system-health',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './system-health.component.html',
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
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Add fetch logic here if needed
    } else {
      this.data = []; // Adjust property name
    }
  }
}