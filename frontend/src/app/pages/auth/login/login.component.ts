import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  loginData = {
    email: '',
    password: ''
  };

  loginError: string = '';

  login(): void {
    if (this.loginData.email && this.loginData.password) {
      console.log('Login Attempt:', this.loginData);
      this.loginError = '';
    } else {
      this.loginError = 'Please enter both email and password.';
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
    } else {
      console.log('Running on server');
      this.loginData = { email: '', password: '' };
    }
  }
}