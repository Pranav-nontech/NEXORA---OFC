import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './about.component.html' // No styleUrls; styles from src/styles.css via angular.json
})
export class AboutComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  headline = 'Discover the Nexora Difference';
  body = "Nexora empowers businesses like yours with a seamless, white-labeled booking experience. We're dedicated to providing a user-friendly platform that enhances customer satisfaction and streamlines your operations.";

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Client-side logic (e.g., fetch data if needed)
      console.log('Running on browser');
    } else {
      // Server-side fallback (SSR)
      console.log('Running on server');
    }
  }
}