import { Component, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form = viewChild<NgForm>('form');

  onLogin() {
    if (!this.form()?.valid) {
      this.form()?.control.markAllAsTouched();
    } else {
      console.log(this.form()?.value);
    }
  }
}
