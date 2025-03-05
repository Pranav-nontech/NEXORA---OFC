import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [RouterLink, CommonModule], // For link
  templateUrl: './success.component.html',
})
export class SuccessComponent implements OnInit {
  private platformId: Object;
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.platformId = platformId;
  }
  bookingConfirmation = {
    service: 'Haircut',
    staff: 'Jane Doe',
    date: new Date(),
    location: 'Salon A, 123 Main St',
    confirmationId: 'NX-123456'
  };
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Add fetch logic here if needed
    } else {
      this.bookingConfirmation = {
        service: '',
        staff: '',
        date: new Date(),
        location: '',
        confirmationId: ''
      }; // Adjust property name
    }
  }
}