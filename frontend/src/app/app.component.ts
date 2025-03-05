import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background-image: url('/assets/images/bg.jpg');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
    .content {
      padding-top: 60px; /* Offset for top navbar */
      margin-left: 50px; /* Offset for collapsed sidebar */
      transition: margin-left 0.3s ease;
    }
    .sidebar:hover ~ .content, .sidebar.open ~ .content {
      margin-left: 200px; /* Adjust for expanded sidebar */
    }
  `],
})
export class AppComponent {
  title = 'Nexora Booking';
}