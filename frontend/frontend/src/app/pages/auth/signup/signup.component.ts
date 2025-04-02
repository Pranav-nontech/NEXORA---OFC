import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit, Optional, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { AuthService } from '@services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from 'app/models/user.model';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './signup.component.html',
  // Styles are handled in styles.css
})
export class SignupComponent implements OnInit {
  private destroyRef$ = inject(DestroyRef);
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() private auth: Auth,
    @Optional() private firestore: Firestore,
    private router: Router,
    private authService: AuthService
  ) {
    console.log('SignupComponent - Constructor called');
    if (isPlatformBrowser(this.platformId) && this.auth) {
      console.log('SignupComponent - Auth instance:', this.auth);
    } else {
      console.log('SignupComponent - Running on server or Auth not provided');
    }
  }

  signupData: User = {
    accountType: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    phoneNumber: '',
    termsConsent: false,
    marketingConsent: false
  };

  signupError: string = '';
  isLoading: boolean = false;

  async signup(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      console.log('SignupComponent - Running on server - skipping signup');
      return;
    }

    if (!this.auth || !this.firestore) {
      this.signupError = 'Authentication or database service is unavailable.';
      return;
    }

    if (!this.signupData.termsConsent) {
      this.signupError = 'You must agree to the Terms of Service and Privacy Policy.';
      return;
    }

    if (!this.signupData.email || !this.signupData.password || !this.signupData.name) {
      this.signupError = 'Please fill in all required fields.';
      return;
    }

    if (this.signupData.password !== this.signupData.confirmPassword) {
      this.signupError = 'Passwords do not match.';
      return;
    }

    this.isLoading = true;
    this.signupError = '';

    this.authService.signup(this.signupData).pipe(takeUntilDestroyed(this.destroyRef$)).subscribe({
      next: (user) => {
        this.router.navigate(['/admin/dashboard']);
        console.log('SignupComponent - User signed up successfully:', user);
      }
    })
  }

  ngOnInit(): void {
    console.log('SignupComponent - ngOnInit called');
    if (isPlatformBrowser(this.platformId)) {
      console.log('SignupComponent - Running on browser');
    } else {
      console.log('SignupComponent - Running on server');
      this.signupData = {
        accountType: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        businessName: '',
        phoneNumber: '',
        termsConsent: false,
        marketingConsent: false
      };
    }
  }
}