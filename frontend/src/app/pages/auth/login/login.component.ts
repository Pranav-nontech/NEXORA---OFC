import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, NgZone, Optional, inject, DestroyRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider, onAuthStateChanged, User } from '@angular/fire/auth';
import { finalize, firstValueFrom, from } from 'rxjs';
import { AuthService } from '@services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface LoadingState {
  email: boolean;
  google: boolean;
  facebook: boolean;
  apple: boolean;
}

interface ErrorMessageState {
  google: string;
  facebook: string;
  apple: string;
}

type ProviderType = 'google' | 'facebook' | 'apple';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styles: [`
    /* Center the content vertically and horizontally */
    .main {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      padding: calc(150px + 2rem) 2rem;
    }

    .section {
      width: 100%;
    }

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* Greeting Text */
    .section-title {
      text-align: center;
    }

    .section-title h2 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .section-title p {
      font-size: 1.1rem;
      color: #6c757d;
    }

    /* Tile styling */
    .auth-tile {
      width: 100%;
      max-width: 500px; /* Increased width for a more professional look */
      padding: 2.5rem; /* Match the padding with global auth-tile */
    }

    /* Title styling */
    .auth-title {
      font-size: 1.75rem;
      margin-bottom: 2rem;
    }

    /* Social login buttons */
    .social-login-container {
      display: flex;
      justify-content: center;
      gap: 1.2rem;
      margin-bottom: 2rem;
    }

    .social-login-btn {
      background: #f5f5f5;
      border: none;
      border-radius: 0.5rem;
      width: 45px;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .social-login-btn:hover {
      background: #e0e0e0;
    }

    .social-login-btn i {
      font-size: 1.3rem;
    }

    .social-login-btn.google i {
      color: #4285F4;
    }

    .social-login-btn.apple i {
      color: #000000;
    }

    .social-login-btn.facebook i {
      color: #4267B2;
    }

    /* Social login messages */
    .social-login-messages {
      margin-bottom: 1.5rem;
    }

    .loading-message {
      color: #6c757d;
      font-size: 0.9rem;
    }

    .loading-message i {
      font-size: 1rem;
      margin-left: 0.5rem;
    }

    .error-message {
      color: red;
      font-size: 0.9rem;
      margin-top: 0.5rem;
    }

    /* Divider */
    .divider {
      position: relative;
      text-align: center;
      margin-bottom: 2rem;
    }

    .divider span {
      background:rgb(255, 255, 255);
      padding: 0 10px;
      color: #6c757d;
      font-size: 0.9rem;
    }

    .divider::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      border-top: 1px solid #ddd;
      z-index: -1;
    }

    /* Form styling */
    .form-group {
      margin-bottom: 1.75rem;
      text-align: left;
    }

    .form-label {
      display: flex;
      align-items: center;
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
    }

    .form-label i {
      margin-right: 0.75rem;
      color: #6c757d;
    }

    .form-input {
      width: 100%;
      padding: 0.75rem 0;
      border: none;
      border-bottom: 1px solid #ddd;
      font-size: 1rem;
      background: transparent;
      outline: none;
      transition: border-color 0.3s ease;
    }

    .form-input:focus {
      border-bottom: 1px solid #333;
    }

    .form-input::placeholder {
      color: #aaa;
    }

    /* Password field wrapper for toggle icon */
    .password-wrapper {
      position: relative;
    }

    .password-toggle {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }

    .password-toggle i {
      color: #6c757d;
      font-size: 1rem;
    }

    /* Form options (Remember Me and Forget Password) */
    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      font-size: 0.9rem;
    }

    .remember-me {
      display: flex;
      align-items: center;
    }

    .remember-me input {
      margin-right: 0.5rem;
    }

    .remember-me label {
      color: #6c757d;
    }

    .forgot-password {
      color: #007bff;
      text-decoration: none;
    }

    .forgot-password:hover {
      text-decoration: underline;
    }

    /* Login button */
    .login-btn {
      width: 100%;
      padding: 1rem;
      background: #333;
      color: #ffffff;
      border: none;
      border-radius: 0.5rem;
      font-size: 1.1rem;
      font-weight: 500;
      text-transform: uppercase;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .login-btn:disabled {
      background: #666;
      cursor: not-allowed;
    }

    .login-btn:hover:not(:disabled) {
      background: #444;
    }

    /* Form links (Create Account and Privacy Policy) */
    .form-links {
      margin-top: 2rem;
      font-size: 0.9rem;
      color: #6c757d;
    }

    .form-links a {
      color: #007bff;
      text-decoration: none;
    }

    .form-links a:hover {
      text-decoration: underline;
    }

    .form-links div {
      margin-bottom: 0.5rem;
    }

    /* Responsive adjustments */
    @media (max-width: 576px) {
      .auth-tile {
        padding: 2rem;
        max-width: 90%;
      }

      .section-title h2 {
        font-size: 1.75rem;
      }

      .section-title p {
        font-size: 1rem;
      }

      .auth-title {
        font-size: 1.5rem;
      }

      .form-label {
        font-size: 1rem;
      }

      .form-input {
        padding: 0.5rem 0;
      }

      .login-btn {
        padding: 0.75rem;
        font-size: 1rem;
      }
    }
  `]
})
export class LoginComponent implements OnInit {
  private destroyRef$ = inject(DestroyRef);
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;
  errorMessage: string = ''; // For email/password login
  isLoading: LoadingState = {
    email: false,
    google: false,
    facebook: false,
    apple: false
  };
  socialErrorMessage: ErrorMessageState = {
    google: '',
    facebook: '',
    apple: ''
  };

  private auth: Auth | null = null; // Make auth optional
  private errorTimeoutIds: { [key in ProviderType]?: NodeJS.Timeout } = {};

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    @Optional() auth: Auth,// Use @Optional() to avoid NullInjectorError
    private authService: AuthService // Assuming you have an AuthService to handle authentication logic
  ) {
    if (isPlatformBrowser(this.platformId) && auth) {
      this.auth = auth;
      console.log('LoginComponent - Auth instance:', this.auth);
    } else {
      console.log('Running on server or Auth not provided - skipping Auth initialization');
    }
  }

  async ngOnInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      console.log('Running on server');
      return;
    }

    console.log('Running on browser');
    this.clearSessionStorageFlags();

    // Check for redirect result (e.g., after signInWithRedirect)
    await this.handleRedirectResult();

    // Listen for navigation events to clear flags on redirect
    this.route.url.subscribe(() => {
      console.log('LoginComponent - Navigation detected - Clearing sessionStorage flags');
      this.clearSessionStorageFlags();
    });
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

    this.isLoading.email = true;
    this.errorMessage = '';

    this.authService.login(this.email, this.password).pipe(finalize(() => this.isLoading.email = false), takeUntilDestroyed(this.destroyRef$)).subscribe({
      next: (isLoggedIn) => {
        if(isLoggedIn) {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.errorMessage = 'Invalid email or password.';
        }
      }
    })
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  async loginWithGoogle(): Promise<void> {
    console.log('Google login button clicked');
    if (!isPlatformBrowser(this.platformId)) {
      console.log('Running on server - skipping Google login');
      return;
    }

    if (!this.auth) {
      this.setErrorMessage('google', 'Authentication service is unavailable.');
      return;
    }

    this.isLoading.google = true;
    this.socialErrorMessage.google = '';

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      if (result.user) {
        console.log('Google login successful:', result.user);
        const userData = { uid: result.user.uid, displayName: result.user.displayName };
        if (this.rememberMe) {
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          sessionStorage.setItem('user', JSON.stringify(userData));
        }
        await this.ngZone.run(() => this.router.navigate(['/home']));
      }
    } catch (error: any) {
      console.error('Google login failed:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        this.setErrorMessage('google', 'Authentication failed');
      } else if (error.code === 'auth/popup-blocked') {
        this.socialErrorMessage.google = 'Popup was blocked. Falling back to redirect-based login.';
        await this.fallbackToRedirect('google');
      } else {
        this.setErrorMessage('google', 'Google login failed: ' + (error.message || 'Unknown error'));
      }
    } finally {
      this.isLoading.google = false;
    }
  }

  async loginWithFacebook(): Promise<void> {
    console.log('Facebook login button clicked');
    if (!isPlatformBrowser(this.platformId)) {
      console.log('Running on server - skipping Facebook login');
      return;
    }

    if (!this.auth) {
      this.setErrorMessage('facebook', 'Authentication service is unavailable.');
      return;
    }

    this.isLoading.facebook = true;
    this.socialErrorMessage.facebook = '';

    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      if (result.user) {
        console.log('Facebook login successful:', result.user);
        const userData = { uid: result.user.uid, displayName: result.user.displayName };
        if (this.rememberMe) {
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          sessionStorage.setItem('user', JSON.stringify(userData));
        }
        await this.ngZone.run(() => this.router.navigate(['/home']));
      }
    } catch (error: any) {
      console.error('Facebook login failed:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        this.setErrorMessage('facebook', 'Authentication failed');
      } else if (error.code === 'auth/popup-blocked') {
        this.socialErrorMessage.facebook = 'Popup was blocked. Falling back to redirect-based login.';
        await this.fallbackToRedirect('facebook');
      } else {
        this.setErrorMessage('facebook', 'Facebook login failed: ' + (error.message || 'Unknown error'));
      }
    } finally {
      this.isLoading.facebook = false;
    }
  }

  async loginWithApple(): Promise<void> {
    console.log('Apple login button clicked');
    if (!isPlatformBrowser(this.platformId)) {
      console.log('Running on server - skipping Apple login');
      return;
    }

    if (!this.auth) {
      this.setErrorMessage('apple', 'Authentication service is unavailable.');
      return;
    }

    this.isLoading.apple = true;
    this.socialErrorMessage.apple = '';

    try {
      const provider = new OAuthProvider('apple.com');
      provider.addScope('email');
      provider.addScope('name');
      const result = await signInWithPopup(this.auth, provider);
      if (result.user) {
        console.log('Apple login successful:', result.user);
        const userData = { uid: result.user.uid, displayName: result.user.displayName };
        if (this.rememberMe) {
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          sessionStorage.setItem('user', JSON.stringify(userData));
        }
        await this.ngZone.run(() => this.router.navigate(['/home']));
      }
    } catch (error: any) {
      console.error('Apple login failed:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        this.setErrorMessage('apple', 'Authentication failed');
      } else if (error.code === 'auth/popup-blocked') {
        this.socialErrorMessage.apple = 'Popup was blocked. Falling back to redirect-based login.';
        await this.fallbackToRedirect('apple');
      } else {
        this.setErrorMessage('apple', 'Apple login failed: ' + (error.message || 'Unknown error'));
      }
    } finally {
      this.isLoading.apple = false;
    }
  }

  private setErrorMessage(provider: ProviderType, message: string): void {
    if (this.errorTimeoutIds[provider]) {
      clearTimeout(this.errorTimeoutIds[provider]);
    }

    this.socialErrorMessage[provider] = message;

    this.errorTimeoutIds[provider] = setTimeout(() => {
      this.socialErrorMessage[provider] = '';
      delete this.errorTimeoutIds[provider];
    }, 30000);
  }

  private async fallbackToRedirect(providerType: ProviderType): Promise<void> {
    if (!this.auth) {
      this.setErrorMessage(providerType, 'Authentication service is unavailable.');
      return;
    }

    try {
      let provider;
      switch (providerType) {
        case 'google':
          provider = new GoogleAuthProvider();
          break;
        case 'facebook':
          provider = new FacebookAuthProvider();
          break;
        case 'apple':
          provider = new OAuthProvider('apple.com');
          provider.addScope('email');
          provider.addScope('name');
          break;
        default:
          throw new Error('Invalid provider: ' + providerType);
      }
      await signInWithRedirect(this.auth, provider);
    } catch (error) {
      console.error('Error in fallback redirect authentication:', error);
      this.setErrorMessage(providerType, 'Authentication failed. Please try again.');
    }
  }

  private async handleRedirectResult(): Promise<void> {
    if (!isPlatformBrowser(this.platformId) || !this.auth) {
      console.log('Skipping redirect result handling on server or if Auth is unavailable');
      return;
    }

    try {
      const user = await this.ngZone.run(() =>
        firstValueFrom(
          from(
            new Promise<User | null>((resolve) => {
              this.ngZone.run(() => {
                if (this.auth) {
                  onAuthStateChanged(this.auth, (user) => resolve(user), (error) => resolve(null));
                } else {
                  resolve(null);
                }
              });
            })
          )
        )
      );

      if (user) {
        console.log('User authenticated after redirect:', user.uid);
        const userData = { uid: user.uid, displayName: user.displayName || user.email };
        if (this.rememberMe) {
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          sessionStorage.setItem('user', JSON.stringify(userData));
        }
        await this.ngZone.run(() => this.router.navigate(['/home']));
      }
    } catch (error) {
      console.error('Error processing redirect result:', error);
      this.setErrorMessage('google', 'Authentication failed after redirect.');
      this.setErrorMessage('facebook', 'Authentication failed after redirect.');
      this.setErrorMessage('apple', 'Authentication failed after redirect.');
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