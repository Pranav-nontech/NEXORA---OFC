import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './success.component.html'
})
export class SuccessComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  bookingConfirmation = {
    service: 'Haircut',
    staff: 'Jane Doe',
    date: new Date(),
    location: 'Salon A, 123 Main St',
    confirmationId: 'NX-123456'
  };

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
    } else {
      console.log('Running on server');
      this.bookingConfirmation = {
        service: '',
        staff: '',
        date: new Date(),
        location: '',
        confirmationId: ''
      };
    }
  }
}