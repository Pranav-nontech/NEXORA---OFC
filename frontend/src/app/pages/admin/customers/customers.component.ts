import { Component } from '@angular/core';

@Component({
  selector: 'app-customers',
  standalone: true,
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com' }
  ];

  deleteCustomer(id: number): void {
    this.customers = this.customers.filter(c => c.id !== id);
    console.log('Customer Deleted:', id);
  }
}