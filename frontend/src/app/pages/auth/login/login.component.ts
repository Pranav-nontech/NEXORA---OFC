import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;
  errorMessage: string = '';

  private auth: Auth | undefined;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (isPlatformBrowser(this.platformId)) {
      try {
        this.auth = inject(Auth);
        console.log('LoginComponent - Auth instance:', this.auth);
      } catch (error) {
        console.error('Failed to inject Auth service in LoginComponent:', error);
        this.errorMessage = 'Authentication service is unavailable. Please try again later.';
      }
    } else {
      console.log('Running on server - skipping Auth injection');
    }
  }

  async onSubmit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      console.log('Running on server - skipping login');
      return;
    }

    if (!this.auth) {
      this.errorMessage = 'Authentication service is unavailable.';
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, this.email, this.password);
      const user = userCredential.user;
      console.log('Email login successful:', user);
      const userData = { uid: user.uid, email: user.email };
      if (this.rememberMe) {
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        sessionStorage.setItem('user', JSON.stringify(userData));
      }
      this.router.navigate(['/home']);
    } catch (error: unknown) {
      console.error('Email login failed:', error);
      const errorMessage = (error as { message?: string }).message;
      this.errorMessage = errorMessage || 'An error occurred during login.';
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  loginWithGoogle(): void {
    console.log('Google login button clicked');
    if (isPlatformBrowser(this.platformId)) {
      this.router.navigate(['/auth/google']).then(success => {
        console.log('Navigation to /auth/google successful:', success);
      }).catch(error => {
        console.error('Navigation to /auth/google failed:', error);
      });
    }
  }

  loginWithApple(): void {
    console.log('Apple login button clicked');
    if (isPlatformBrowser(this.platformId)) {
      this.router.navigate(['/auth/apple']).then(success => {
        console.log('Navigation to /auth/apple successful:', success);
      }).catch(error => {
        console.error('Navigation to /auth/apple failed:', error);
      });
    }
  }

  loginWithFacebook(): void {
    console.log('Facebook login button clicked');
    if (isPlatformBrowser(this.platformId)) {
      this.router.navigate(['/auth/facebook']).then(success => {
        console.log('Navigation to /auth/facebook successful:', success);
      }).catch(error => {
        console.error('Navigation to /auth/facebook failed:', error);
      });
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running on browser');
      this.clearSessionStorageFlags();
      // Listen for navigation events to clear flags on redirect
      this.route.url.subscribe(() => {
        console.log('LoginComponent - Navigation detected - Clearing sessionStorage flags');
        this.clearSessionStorageFlags();
      });
    } else {
      console.log('Running on server');
    }
  }

  private clearSessionStorageFlags(): void {
    console.log('LoginComponent - Clearing sessionStorage flags');
    sessionStorage.removeItem('googleLoginAttempted');
    sessionStorage.removeItem('appleLoginAttempted');
    sessionStorage.removeItem('facebookLoginAttempted');
    console.log('LoginComponent - googleLoginAttempted after clear:', sessionStorage.getItem('googleLoginAttempted'));
  }
}