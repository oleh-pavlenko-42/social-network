import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../shared/button/button.component';
import { confirmPasswordValidator } from './validators';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
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

  onSignup() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
    } else {
      console.log(this.form.value);
    }
  }
}
