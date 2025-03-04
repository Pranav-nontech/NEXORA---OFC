import { Component } from '@angular/core';

@Component({
  selector: 'app-service-selection',
  standalone: true,
  templateUrl: './service-selection.component.html',
  styleUrls: ['./service-selection.component.css']
})
export class ServiceSelectionComponent {
  services = [
    { id: 1, name: 'Haircut', duration: 30, price: 25 },
    { id: 2, name: 'Massage', duration: 60, price: 50 }
  ];

  selectedService: { id: number; name: string; duration: number; price: number } | null = null;

  selectService(id: number): void {
    this.selectedService = this.services.find(s => s.id === id) || null;
    console.log('Service Selected:', this.selectedService);
  }
}