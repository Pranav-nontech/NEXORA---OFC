import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-system-health',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './system-health.component.html'
})
export class SystemHealthComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  systemStatus = {
    backend: 'Online',
    lastChecked: new Date()
  };

  healthData: any;

  checkSystemHealth(): void {
    this.systemStatus.lastChecked = new Date();
    console.log('System Health Checked:', this.systemStatus);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
    } else {
      console.log('Running on server');
      this.healthData = {};
    }
  }
}