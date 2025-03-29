import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../shared/services/admin.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private adminService: AdminService
  ) {}

  stats = {
    appointmentsToday: 0,
    totalCustomers: 0,
    revenue: 0
  };
  error: string | null = null;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
      this.adminService.getBookings().subscribe({
        next: (bookings) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          this.stats.appointmentsToday = bookings.filter((b: any) => {
            const bookingDate = new Date(b.timeSlot);
            return bookingDate >= today && bookingDate < new Date(today.getTime() + 24 * 60 * 60 * 1000);
          }).length;
          this.stats.revenue = bookings.reduce((sum: number, b: any) => sum + b.serviceId.price, 0);
        },
        error: (err) => {
          this.error = err.error.message || 'Failed to fetch bookings';
          console.error('Failed to fetch bookings:', err);
        }
      });
      this.adminService.getCustomers().subscribe({
        next: (customers) => {
          this.stats.totalCustomers = customers.length;
        },
        error: (err) => {
          this.error = err.error.message || 'Failed to fetch customers';
          console.error('Failed to fetch customers:', err);
        }
      });
    } else {
      console.log('Running on server');
      this.stats = { appointmentsToday: 0, totalCustomers: 0, revenue: 0 };
    }
  }
}