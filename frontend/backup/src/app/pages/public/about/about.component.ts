import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, CommonModule], // For CTA link
  templateUrl: './about.component.html',
})
export class AboutComponent {
  headline = 'Discover the Nexora Difference';
  body = "Nexora empowers businesses like yours with a seamless, white-labeled booking experience. We're dedicated to providing a user-friendly platform that enhances customer satisfaction and streamlines your operations.";
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Add fetch logic here if needed
    } else {
      this.data = []; // Adjust property name
    }
  }
}