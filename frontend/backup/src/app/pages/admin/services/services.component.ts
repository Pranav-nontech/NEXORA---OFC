import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  services = [
    { id: 1, name: 'Haircut', duration: 30, price: 25 }
  ];

  addService(service: { name: string; duration: number; price: number }): void {
    this.services.push({ id: this.services.length + 1, ...service });
    console.log('Service Added:', service);
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Add fetch logic here if needed
    } else {
      this.data = []; // Adjust property name
    }
  }
}