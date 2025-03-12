import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com' }
  ];

  deleteCustomer(id: number): void {
    this.customers = this.customers.filter(c => c.id !== id);
    console.log('Customer Deleted:', id);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
    } else {
      console.log('Running on server');
      this.customers = [];
    }
  }
}