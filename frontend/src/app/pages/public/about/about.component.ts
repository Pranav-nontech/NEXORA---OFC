import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink], // For CTA link
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  headline = 'Discover the Nexora Difference';
  body = "Nexora empowers businesses like yours with a seamless, white-labeled booking experience. We're dedicated to providing a user-friendly platform that enhances customer satisfaction and streamlines your operations.";
}