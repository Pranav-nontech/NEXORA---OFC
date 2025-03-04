import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink], // FormsModule for ngModel
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
}