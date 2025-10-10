import { Component } from '@angular/core';
import { AppHeaderComponent } from '@/app/shared/components/shared/app-header/app-header.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '@/app/core/services';
import { Store } from '@ngrx/store';
import { setUserProfile, setUserType } from '@/app/core/store/user/user.actions';
import { Router } from '@angular/router';
import { FormInputComponent } from '@/app/shared/components/ui/form/form-input/form-input.component';
import { getErrorMessage } from '@/app/shared/utils/form.utils';
import { SystemService } from '@/app/core/services';

@Component({
  selector: 'app-signin',
  imports: [
    AppHeaderComponent,
    ReactiveFormsModule,
    CommonModule,
    FormInputComponent,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  headerLinks = [
    { label: 'Sign In', path: '/signin' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'About Us', path: '/about-us' },
  ];

  signinForm: FormGroup;

  healthStatus: 'checking' | 'ok' | 'fail' = 'checking';
  healthMessage = '';
  showErrorDialog = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private store: Store, private router: Router) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.runHealthcheckWithRetry();
  }

  private async runHealthcheckWithRetry(maxAttempts: number = 5) {
    let attempt = 0;
    let delayMs = 500;
    this.healthStatus = 'checking';
    this.healthMessage = 'Checking API connectivity...';

    while (attempt < maxAttempts) {
      try {
        const result = await SystemService.healthCheck();
        this.healthStatus = 'ok';
        this.healthMessage = '✓ API connected';
        console.info('Healthcheck result:', result);
        return;
      } catch (err: any) {
        attempt++;
        this.healthStatus = 'checking';
        this.healthMessage = `Retrying API connectivity (${attempt}/${maxAttempts})...`;
        console.warn('Healthcheck attempt failed:', err);
        if (attempt >= maxAttempts) break;
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        delayMs = Math.min(delayMs * 2, 8000);
      }
    }

    this.healthStatus = 'fail';
    this.healthMessage = 'API unreachable';
  }

  async onSubmit() {
    if (this.signinForm.valid && this.healthStatus === 'ok') {
      try {
        const { email, password } = this.signinForm.value;
        const decoded = await AuthenticationService.signin(email, password);
        const role = decoded?.user?.roleName;
        const id = decoded?.user?.id;
        const name = decoded?.user?.name || decoded?.user?.email || '';
        const avatar = decoded?.user?.avatar || undefined;
        this.store.dispatch(setUserType({ userType: (role || '').toLowerCase() } as any));
        this.store.dispatch(setUserProfile({ id, name, email, avatar }));
        if (role?.toLowerCase() === 'instructor') {
          this.router.navigate(['/instructor/']);
        } else if (role?.toLowerCase() === 'admin') {
          this.router.navigate(['/admin/']);
        } else {
          this.router.navigate(['/student/']);
        }
      } catch (error: any) {
        if (error.response?.status === 401) {
          this.errorMessage = 'Invalid credentials provided';
          this.showErrorDialog = true;
        } else {
          this.errorMessage = 'An error occurred during login. Please try again.';
          this.showErrorDialog = true;
        }
      }
    }
  }

  getErrorMessage(controlName: string): string {
    return getErrorMessage(this.signinForm.get(controlName), controlName);
  }

  closeErrorDialog() {
    this.showErrorDialog = false;
    this.errorMessage = '';
  }
}
