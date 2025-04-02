import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../shared/services/admin.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html'
})
export class ServicesComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private adminService: AdminService
  ) {}

  services: any[] = [];
  error: string | null = null;

  addService(service: { name: string; duration: number; price: number }): void {
    if (!service.name || !service.duration || !service.price) {
      this.error = 'Please fill in all fields';
      return;
    }
    this.adminService.createService(service).subscribe({
      next: (newService) => {
        this.services.push(newService);
        alert('Service Added Successfully!');
        this.error = null;
      },
      error: (err) => {
        this.error = err.error.message || 'Failed to add service';
        console.error('Failed to add service:', err);
      }
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
      this.adminService.getServices().subscribe({
        next: (data) => {
          this.services = data;
        },
        error: (err) => {
          this.error = err.error.message || 'Failed to fetch services';
          console.error('Failed to fetch services:', err);
        }
      });
    } else {
      console.log('Running on server');
      this.services = [];
    }
  }
}