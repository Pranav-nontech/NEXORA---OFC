import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../shared/services/admin.service';

@Component({
  selector: 'app-system-health',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './system-health.component.html'
})
export class SystemHealthComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private adminService: AdminService
  ) {}

  systemStatus = {
    backend: 'Unknown',
    lastChecked: new Date()
  };
  error: string | null = null;

  checkSystemHealth(): void {
    this.adminService.checkSystemHealth().subscribe({
      next: (response) => {
        this.systemStatus.backend = response.status || 'Online';
        this.systemStatus.lastChecked = new Date();
        this.error = null;
      },
      error: (err) => {
        this.systemStatus.backend = 'Offline';
        this.systemStatus.lastChecked = new Date();
        this.error = err.error.message || 'Failed to check system health';
        console.error('Failed to check system health:', err);
      }
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
      this.checkSystemHealth();
    } else {
      console.log('Running on server');
      this.systemStatus = { backend: 'Unknown', lastChecked: new Date() };
    }
  }
}