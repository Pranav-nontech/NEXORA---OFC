import { Provider, inject } from '@angular/core';
import { Auth, getAuth } from '@angular/fire/auth';
import { FirebaseApp } from '@angular/fire/app';

export const AUTH_PROVIDER: Provider = {
  provide: Auth,
  useFactory: () => {
    const app = inject(FirebaseApp);
    console.log('FirebaseApp in AUTH_PROVIDER:', app);
    const auth = getAuth(app);
    console.log('Auth instance in AUTH_PROVIDER:', auth);
    return auth;
  },
  deps: [FirebaseApp],
};