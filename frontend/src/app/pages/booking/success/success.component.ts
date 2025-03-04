import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [RouterLink], // For link
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent {
  bookingConfirmation = {
    service: 'Haircut',
    staff: 'Jane Doe',
    date: new Date(),
    location: 'Salon A, 123 Main St',
    confirmationId: 'NX-123456'
  };
}