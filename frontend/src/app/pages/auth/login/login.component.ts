import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth'; // Import Firebase Auth
import { NgZone } from '@angular/core'; // Import NgZone

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  // Form data
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;
  errorMessage: string = ''; // Add error message for displaying login errors

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private auth: Auth, // Inject Auth service
    private ngZone: NgZone // Inject NgZone
  ) {}

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Handle form submission
  async onSubmit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const userCredential = await this.ngZone.run(() =>
          signInWithEmailAndPassword(this.auth, this.email, this.password)
        );
        const user = userCredential.user;
        console.log('Email login successful:', user);

        // Store user data based on rememberMe
        const userData = { uid: user.uid, email: user.email };
        if (this.rememberMe) {
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          sessionStorage.setItem('user', JSON.stringify(userData));
        }

        // Navigate to home page
        this.ngZone.run(() => this.router.navigate(['/home']));
      } catch (error: any) {
        console.error('Email login failed:', error);
        this.errorMessage = error.message; // Display error to user
      }
    } else {
      console.log('Running on server - skipping login');
    }
  }

  // Social login methods
  loginWithGoogle(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.router.navigate(['/auth/google']);
    }
  }

  loginWithApple(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.router.navigate(['/auth/apple']);
    }
  }

  loginWithFacebook(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.router.navigate(['/auth/facebook']);
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
    } else {
      console.log('Running on server');
    }
  }
}