import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule], // FormsModule for ngModel
  templateUrl: './login.component.html',
})
export class LoginComponent {
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
      // Add fetch logic here if needed
    } else {
      this.data = []; // Adjust property name
    }
  }
}