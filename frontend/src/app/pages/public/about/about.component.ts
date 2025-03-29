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

  headline = 'Empowering Your Business with Seamless Booking Solutions';

  body = `At Nexora, we’re passionate about simplifying the way businesses connect with their customers. Founded with a vision to revolutionize the booking experience, we provide a powerful, white-labeled platform that seamlessly integrates into your brand, allowing you to offer a professional and user-friendly booking process. Our mission is to help businesses of all sizes—from solo entrepreneurs to large enterprises—streamline their operations, boost customer satisfaction, and grow effortlessly.

  With Nexora, you get more than just a booking tool. Our platform is designed to save you time, reduce administrative hassles, and enhance your customers’ experience with features like easy scheduling, automated reminders, and secure payment options. We’re committed to innovation, constantly evolving our platform to meet the unique needs of our clients while maintaining the highest standards of security and reliability.

  Join thousands of businesses who trust Nexora to power their booking needs. Let us help you focus on what you do best—delivering exceptional services—while we take care of the rest. Ready to transform your booking process? Start your free trial today and discover the Nexora difference!`;

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