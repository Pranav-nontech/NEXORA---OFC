import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customers.component.html',
})
export class CustomersComponent {
  customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com' }
  ];

  deleteCustomer(id: number): void {
    this.customers = this.customers.filter(c => c.id !== id);
    console.log('Customer Deleted:', id);
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Add fetch logic here if needed
    } else {
      this.data = []; // Adjust property name
    }
  }
}