import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AdminService } from '../../../shared/services/admin.service';
import { BookingService } from '../../../shared/services/booking.service';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, ChartType } from 'ng-apexcharts';

interface Booking {
  _id: string;
  timeSlot: string;
  customerId: { name: string };
  serviceId: { name: string; price: number };
  status: 'Pending' | 'Confirmed' | 'Canceled';
}

interface Customer {
  id: string;
  name: string;
  email: string;
}

interface Profile {
  name: string;
  email: string;
  services: string[];
  availability: string[];
  completionPercentage?: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatButtonModule, NgApexchartsModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  chartOptions: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    title: ApexTitleSubtitle;
  } = {
    series: [
      {
        name: 'Bookings',
        data: [10, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
    chart: {
      type: 'line' as ChartType, // Explicitly typed to avoid undefined
      height: 350,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
    title: {
      text: 'Monthly Bookings',
    },
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private adminService: AdminService,
    private bookingService: BookingService
  ) {}

  stats = {
    appointmentsToday: 0,
    totalCustomers: 0,
    revenue: 0,
    pendingBookings: 0,
    cancellationRate: 0,
  };

  bookings: Booking[] = [];
  displayedColumns: string[] = ['date', 'customer', 'service', 'status', 'actions'];
  customers: Customer[] = [];
  profile: Profile = {
    name: '',
    email: '',
    services: [],
    availability: [],
    completionPercentage: 0,
  };

  error: string | null = null;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
      this.loadDashboardData();
    } else {
      console.log('Running on server');
      this.initializeDefaultStats();
    }
  }

  loadDashboardData(): void {
    this.bookingService.getBookings().subscribe({
      next: (bookings: Booking[]) => {
        this.bookings = bookings || [];
        this.updateStats();
      },
      error: (err: any) => {
        this.error = 'Bookings unavailable - check backend connection';
        console.error('Failed to fetch bookings:', err);
        this.bookings = this.getFallbackBookings();
        this.updateStats();
      },
    });

    this.adminService.getCustomers().subscribe({
      next: (customers: Customer[]) => {
        this.customers = customers || [];
        this.stats.totalCustomers = this.customers.length;
      },
      error: (err: any) => {
        this.error = 'Customers unavailable - check backend connection';
        console.error('Failed to fetch customers:', err);
        this.customers = this.getFallbackCustomers();
        this.stats.totalCustomers = this.customers.length;
      },
    });

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.profile = {
      name: user.name || 'Admin',
      email: user.email || '',
      services: [],
      availability: [],
      completionPercentage: 0,
    };
    this.adminService.getServices().subscribe({
      next: (services: any[]) => {
        this.profile.services = services.map((s: any) => s.name) || [];
        this.profile.completionPercentage = this.calculateProfileCompletion(this.profile);
      },
      error: (err: any) => {
        console.error('Failed to fetch services:', err);
        this.profile.services = ['Consulting', 'Design'];
        this.profile.availability = ['Mon 9-5', 'Wed 10-3'];
        this.profile.completionPercentage = this.calculateProfileCompletion(this.profile);
      },
    });
  }

  updateStats(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.stats.appointmentsToday = this.bookings.filter((b) => {
      const bookingDate = new Date(b.timeSlot);
      return bookingDate >= today && bookingDate < new Date(today.getTime() + 24 * 60 * 60 * 1000);
    }).length;
    this.stats.pendingBookings = this.bookings.filter((b) => b.status === 'Pending').length;
    this.stats.revenue = this.bookings.reduce((sum, b) => sum + b.serviceId.price, 0);
    this.stats.cancellationRate = (this.bookings.filter((b) => b.status === 'Canceled').length / this.bookings.length) * 100 || 0;
  }

  initializeDefaultStats(): void {
    this.stats = { appointmentsToday: 0, totalCustomers: 0, revenue: 0, pendingBookings: 0, cancellationRate: 0 };
    this.bookings = [];
    this.customers = [];
    this.profile = { name: '', email: '', services: [], availability: [], completionPercentage: 0 };
  }

  calculateProfileCompletion(profile: Profile): number {
    const fields = [profile.name, profile.email, profile.services.length > 0, profile.availability.length > 0];
    const completed = fields.filter(Boolean).length;
    return (completed / fields.length) * 100;
  }

  confirmBooking(bookingId: string): void {
    this.bookingService.updateBookingStatus(bookingId, 'Confirmed').subscribe({
      next: () => this.loadDashboardData(),
      error: (err: any) => {
        this.error = 'Failed to confirm booking';
        console.error('Failed to confirm booking:', err);
        const booking = this.bookings.find((b) => b._id === bookingId);
        if (booking) {
          booking.status = 'Confirmed';
          this.updateStats();
        }
      },
    });
  }

  exportBookings(): void {
    const csv = this.bookings.map((b) => `${b.timeSlot},${b.customerId.name},${b.serviceId.name},${b.status}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bookings.csv';
    a.click();
  }

  private getFallbackBookings(): Booking[] {
    return [
      { _id: '1', timeSlot: '2025-03-30T10:00:00', customerId: { name: 'John Doe' }, serviceId: { name: 'Consulting', price: 50 }, status: 'Pending' },
      { _id: '2', timeSlot: '2025-03-30T14:00:00', customerId: { name: 'Jane Smith' }, serviceId: { name: 'Design', price: 75 }, status: 'Confirmed' },
      { _id: '3', timeSlot: '2025-03-29T09:00:00', customerId: { name: 'Mike Ross' }, serviceId: { name: 'Development', price: 100 }, status: 'Canceled' },
    ];
  }

  private getFallbackCustomers(): Customer[] {
    return [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
      { id: '3', name: 'Mike Ross', email: 'mike@example.com' },
    ];
  }
}