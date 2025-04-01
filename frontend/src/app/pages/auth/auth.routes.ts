import { Routes } from "@angular/router";
import { EmailVerificationComponent } from "./email-verification/email-verification.component";
import { LoginComponent } from "./login/login.component";
import { PasswordResetComponent } from "./password-reset/password-reset.component";
import { SignupComponent } from "./signup/signup.component";

export const authRoutes: Routes = [
    {
        path: 'verify-email',
        component: EmailVerificationComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'forgot-password',
        component: PasswordResetComponent,
    },
    {
        path: 'signup',
        component: SignupComponent,
    }
]