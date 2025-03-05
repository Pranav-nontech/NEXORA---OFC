import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-system-health',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './system-health.component.html',
})
export class SystemHealthComponent implements OnInit {
  private platformId: Object;
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.platformId = platformId;
  }
  systemStatus = {
    backend: 'Online',
    lastChecked: new Date()
  };
  healthData: any;

  checkSystemHealth(): void {
    // Placeholder for health check
    this.systemStatus.lastChecked = new Date();
    console.log('System Health Checked:', this.systemStatus);
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Add fetch logic here if needed
    } else {
      this.healthData = {}; // Adjust property name
    }
  }
}