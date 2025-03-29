import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { BookingService } from '../../../shared/services/booking.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-service-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-selection.component.html'
})
export class ServiceSelectionComponent implements OnInit {
  services: any[] = [];
  selectedService: any = null;

  constructor(
    private bookingService: BookingService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
      this.bookingService.getServices().subscribe({
        next: (data) => {
          this.services = data;
          if (this.services.length === 0) {
            console.error('No services available');
          }
        },
        error: (err) => console.error('Failed to fetch services:', err)
      });
    } else {
      console.log('Running on server');
      this.services = [];
    }
  }

  selectService(id: string): void {
    this.selectedService = this.services.find(s => s._id === id) || null;
    if (this.selectedService) {
      this.bookingService.setService(this.selectedService);
      this.router.navigate(['/booking/staff-selection']);
    }
  }
}