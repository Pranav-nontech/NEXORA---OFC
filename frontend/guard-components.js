const fs = require('fs').promises;
const path = require('path');

const componentsDir = 'src/app/pages';
const components = [
  'public/home/home.component.ts', 'public/about/about.component.ts', 'public/contact/contact.component.ts',
  'public/features/features.component.ts', 'public/pricing/pricing.component.ts', 'public/faq/faq.component.ts',
  'public/privacy/privacy.component.ts', 'public/terms/terms.component.ts', 'public/cookie/cookie.component.ts',
  'booking/service-selection/service-selection.component.ts', 'booking/staff-selection/staff-selection.component.ts',
  'booking/time-slot-selection/time-slot-selection.component.ts', 'booking/customer-info/customer-info.component.ts',
  'booking/confirmation/confirmation.component.ts', 'booking/payment/payment.component.ts',
  'booking/success/success.component.ts', 'booking/management/management.component.ts',
  'auth/email-verification/email-verification.component.ts', 'auth/login/login.component.ts',
  'auth/password-reset/password-reset.component.ts', 'auth/signup/signup.component.ts',
  'admin/ai-config/ai-config.component.ts', 'admin/branding/branding.component.ts',
  'admin/calendar/calendar.component.ts', 'admin/customers/customers.component.ts',
  'admin/dashboard/dashboard.component.ts', 'admin/integrations/integrations.component.ts',
  'admin/notifications/notifications.component.ts', 'admin/reports/reports.component.ts',
  'admin/services/services.component.ts', 'admin/settings/settings.component.ts',
  'admin/staff/staff.component.ts', 'admin/system-health/system-health.component.ts'
];

const dataProperties = {
  'home.component.ts': { name: 'features', isArray: true },
  'pricing.component.ts': { name: 'plans', isArray: true },
  'service-selection.component.ts': { name: 'services', isArray: true },
  'staff-selection.component.ts': { name: 'staff', isArray: true },
  'time-slot-selection.component.ts': { name: 'timeSlots', isArray: true },
  'customer-info.component.ts': { name: 'customerInfo', isArray: false },
  'confirmation.component.ts': { name: 'booking', isArray: false },
  'payment.component.ts': { name: 'paymentDetails', isArray: false },
  'success.component.ts': { name: 'confirmation', isArray: false },
  'management.component.ts': { name: 'bookings', isArray: true },
  'email-verification.component.ts': { name: 'verificationStatus', isArray: false },
  'login.component.ts': { name: 'loginData', isArray: false },
  'password-reset.component.ts': { name: 'resetStatus', isArray: false },
  'signup.component.ts': { name: 'signupData', isArray: false },
  'ai-config.component.ts': { name: 'aiSettings', isArray: false },
  'branding.component.ts': { name: 'brandingData', isArray: false },
  'calendar.component.ts': { name: 'events', isArray: true },
  'customers.component.ts': { name: 'customers', isArray: true },
  'dashboard.component.ts': { name: 'dashboardData', isArray: false },
  'integrations.component.ts': { name: 'integrations', isArray: true },
  'notifications.component.ts': { name: 'notifications', isArray: true },
  'reports.component.ts': { name: 'reports', isArray: true },
  'services.component.ts': { name: 'services', isArray: true },
  'settings.component.ts': { name: 'settings', isArray: false },
  'staff.component.ts': { name: 'staff', isArray: true },
  'system-health.component.ts': { name: 'healthData', isArray: false },
  'about.component.ts': null,
  'contact.component.ts': null,
  'features.component.ts': null,
  'faq.component.ts': null,
  'privacy.component.ts': null,
  'terms.component.ts': null,
  'cookie.component.ts': null
};

async function guardComponent(filePath) {
  const fullPath = path.join(__dirname, componentsDir, filePath);
  let content = await fs.readFile(fullPath, 'utf8');

  // Consolidate imports
  if (!content.includes("import { Inject, PLATFORM_ID, OnInit } from '@angular/core';")) {
    content = content.replace(
      /import {([^}]*)} from '@angular\/core';/,
      (match, imports) => {
        const existing = imports.split(',').map(i => i.trim()).filter(i => i);
        const needed = ['Component', 'OnInit', 'Inject', 'PLATFORM_ID'].filter(i => !existing.includes(i));
        return `import { ${[...existing, ...needed].join(', ')} } from '@angular/core';`;
      }
    );
  }
  if (!content.includes("import { isPlatformBrowser } from '@angular/common';")) {
    content = "import { isPlatformBrowser } from '@angular/common';\n" + content;
  }

  // Add implements OnInit if not present
  if (!content.includes('implements OnInit')) {
    content = content.replace(
      /export class (\w+)\s*{/,
      'export class $1 implements OnInit {'
    );
  }

  // Add platformId as a class property if not present
  if (!content.includes('private platformId: Object')) {
    const classMatch = content.match(/export class \w+ implements OnInit\s*{/);
    if (classMatch) {
      content = content.replace(
        classMatch[0],
        `${classMatch[0]}\n  private platformId: Object;`
      );
    }
  }

  // Add or update constructor
  if (!content.includes('constructor(')) {
    const classEndMatch = content.match(/export class \w+ implements OnInit\s*{[\s\S]*?(\n\s*[^}\s])/);
    if (classEndMatch) {
      content = content.replace(
        classEndMatch[0],
        `${classEndMatch[0]}\n  constructor(@Inject(PLATFORM_ID) platformId: Object) {\n    this.platformId = platformId;\n  }`
      );
    }
  } else if (!content.includes('@Inject(PLATFORM_ID)')) {
    content = content.replace(
      /constructor\s*\(([^)]*)\)\s*{/,
      `constructor($1${$1 ? ', ' : ''}@Inject(PLATFORM_ID) platformId: Object) {\n    this.platformId = platformId;`
    );
  }

  // Get the data property for this component
  const propInfo = dataProperties[path.basename(filePath)];
  const dataProperty = propInfo ? propInfo.name : null;
  const isArray = propInfo ? propInfo.isArray : false;

  // Guard ngOnInit
  if (!content.includes('ngOnInit(): void {')) {
    const classEndMatch = content.lastIndexOf('}');
    if (classEndMatch !== -1) {
      const initContent = dataProperty 
        ? `  ngOnInit(): void {\n    if (isPlatformBrowser(this.platformId)) {\n      // Fetch logic can be added here\n    } else {\n      this.${dataProperty} = ${isArray ? '[]' : '{}'};\n    }\n  }\n`
        : `  ngOnInit(): void {\n    if (isPlatformBrowser(this.platformId)) {\n      // Fetch logic can be added here\n    }\n  }\n`;
      content = content.slice(0, classEndMatch) + initContent + content.slice(classEndMatch);
    }
  } else {
    // Remove any existing this.data references
    content = content.replace(/this\.data\s*=\s*\[\];/g, dataProperty ? `this.${dataProperty} = ${isArray ? '[]' : '{}'};` : '');
    // Guard existing ngOnInit if not already guarded
    if (!content.includes('if (isPlatformBrowser(this.platformId))')) {
      content = content.replace(
        /ngOnInit\(\): void\s*{([\s\S]*?)}/,
        (match, originalContent) => {
          const trimmedContent = originalContent.trim();
          return dataProperty 
            ? `ngOnInit(): void {\n    if (isPlatformBrowser(this.platformId)) {\n      ${trimmedContent}\n    } else {\n      this.${dataProperty} = ${isArray ? '[]' : '{}'};\n    }\n  }`
            : `ngOnInit(): void {\n    if (isPlatformBrowser(this.platformId)) {\n      ${trimmedContent}\n    }\n  }`;
        }
      );
    }
  }

  await fs.writeFile(fullPath, content, 'utf8');
  console.log(`Guarded ${filePath}${dataProperty ? ` with property ${dataProperty}` : ' (no data property)'}`);
}

async function guardAllComponents() {
  try {
    for (const component of components) {
      await guardComponent(component);
    }
    console.log('All components guarded successfully!');
  } catch (err) {
    console.error('Error guarding components:', err);
  }
}

guardAllComponents();