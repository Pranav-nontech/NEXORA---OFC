import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithPopup, OAuthProvider } from '@angular/fire/auth';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-apple-login',
  standalone: true,
  imports: [],
  templateUrl: './apple-login.component.html',
  styleUrls: ['./apple-login.component.css']
})
export class AppleLoginComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private auth: Auth,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.signInWithApple();
    } else {
      console.log('Running on server');
    }
  }

  async signInWithApple(): Promise<void> {
    try {
      const provider = new OAuthProvider('apple.com');
      provider.addScope('email');
      provider.addScope('name');
      const result = await this.ngZone.run(() => signInWithPopup(this.auth, provider));
      const user = result.user;
      console.log('Apple login successful:', user);
      this.ngZone.run(() => this.router.navigate(['/home']));
    } catch (error) {
      console.error('Apple login failed:', error);
      this.ngZone.run(() => this.router.navigate(['/login']));
    }
  }
}