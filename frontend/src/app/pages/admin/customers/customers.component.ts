import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customers.component.html',
})
export class CustomersComponent implements OnInit {
  private platformId: Object;
  
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.platformId = platformId;
  }
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
      this.customers = []; // Adjust property name
    }
  }
}