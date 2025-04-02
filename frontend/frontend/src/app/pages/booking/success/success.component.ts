import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './success.component.html'
})
export class SuccessComponent implements OnInit {
  bookingConfirmation: any = null;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
      const navigation = this.router.getCurrentNavigation();
      const state = navigation?.extras.state as { booking?: any };
      if (state?.booking) {
        this.bookingConfirmation = {
          service: state.booking.serviceId.name,
          staff: state.booking.staffId?.name || 'Not specified',
          date: new Date(state.booking.timeSlot),
          location: 'Salon A, 123 Main St', // Update with actual location if available
          confirmationId: state.booking._id
        };
      } else {
        this.router.navigate(['/booking/confirmation']);
      }
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