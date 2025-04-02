import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../shared/services/admin.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html'
})
export class ReportsComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private adminService: AdminService
  ) {}

  reportData = {
    bookingsThisMonth: 0,
    revenueThisMonth: 0
  };
  error: string | null = null;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
      this.adminService.getBookings().subscribe({
        next: (bookings) => {
          const now = new Date();
          const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          this.reportData.bookingsThisMonth = bookings.filter((b: any) => new Date(b.timeSlot) >= firstDayOfMonth).length;
          this.reportData.revenueThisMonth = bookings
            .filter((b: any) => new Date(b.timeSlot) >= firstDayOfMonth)
            .reduce((sum: number, b: any) => sum + b.serviceId.price, 0);
        },
        error: (err) => {
          this.error = err.error.message || 'Failed to fetch reports';
          console.error('Failed to fetch reports:', err);
        }
      });
    } else {
      console.log('Running on server');
      this.reportData = { bookingsThisMonth: 0, revenueThisMonth: 0 };
    }
  }
}