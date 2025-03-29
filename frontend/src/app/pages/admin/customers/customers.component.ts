import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../shared/services/admin.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private adminService: AdminService
  ) {}

  customers: any[] = [];
  error: string | null = null;

  deleteCustomer(id: string): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.adminService.deleteCustomer(id).subscribe({
        next: () => {
          this.customers = this.customers.filter(c => c._id !== id);
          alert('Customer Deleted Successfully!');
        },
        error: (err) => {
          this.error = err.error.message || 'Failed to delete customer';
          console.error('Failed to delete customer:', err);
        }
      });
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
      this.adminService.getCustomers().subscribe({
        next: (data) => {
          this.customers = data;
        },
        error: (err) => {
          this.error = err.error.message || 'Failed to fetch customers';
          console.error('Failed to fetch customers:', err);
        }
      });
    } else {
      console.log('Running on server');
      this.customers = [];
    }
  }
}