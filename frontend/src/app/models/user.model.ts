export interface User {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    accountType: string;
    businessName: string;
    phoneNumber: string;
    termsConsent: boolean;
    marketingConsent: boolean;
}