import { Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonComponent } from '../../shared/button/button.component';
import { AuthService } from '../auth.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { AlertComponent } from '../../shared/alert/alert.component';
import { delay } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ButtonComponent, LoaderComponent, AlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  isLoading = false;
  error: string | null = null;

  form = viewChild<NgForm>('form');

  onLogin(): void {
    if (!this.form()?.valid) {
      this.form()?.control.markAllAsTouched();
    } else {
      const { email, password } = this.form()?.value;
      if (email && password) {
        this.isLoading = true;
        const loginSub = this.authService.login(email, password).subscribe({
          next: (authResponse) => {
            this.isLoading = false;
            this.router.navigate(['/']);
          },
          error: (errorMessage) => {
            this.error = errorMessage;
            this.isLoading = false;
          },
        });

        this.destroyRef.onDestroy(() => {
          loginSub.unsubscribe();
        });
      }
    }
  }
}
