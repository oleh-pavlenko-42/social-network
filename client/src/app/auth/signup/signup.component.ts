import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../shared/button/button.component';
import { confirmPasswordValidator } from './validators';
import { AuthService } from '../auth.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { Router } from '@angular/router';
import { AlertComponent } from '../../shared/alert/alert.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    LoaderComponent,
    AlertComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  isLoading = false;
  error: string | null = null;
  form = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: [confirmPasswordValidator] }
  );

  onSignup(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    } else {
      const { email, name, password } = this.form.value;
      if (email && name && password) {
        this.isLoading = true;
        const signupSub = this.authService
          .signup(email, name, password)
          .subscribe({
            next: (authResponse) => {
              this.isLoading = false;
              this.router.navigate(['/']);
            },
            error: (errorMessage) => {
              this.isLoading = false;
              this.error = errorMessage;
            },
          });

        this.destroyRef.onDestroy(() => {
          signupSub.unsubscribe();
        });
      }
    }
  }
}
