import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: true,
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  services = [
    { id: 1, name: 'Haircut', duration: 30, price: 25 }
  ];

  addService(service: { name: string; duration: number; price: number }): void {
    this.services.push({ id: this.services.length + 1, ...service });
    console.log('Service Added:', service);
  }
}