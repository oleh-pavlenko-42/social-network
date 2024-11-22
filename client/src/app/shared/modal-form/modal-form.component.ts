import { Component, input, output, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule, ButtonComponent],
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.scss',
})
export class ModalFormComponent {
  title = input();
  close = output();
  submit = output<{ title: string; content: string }>();
  form = viewChild<NgForm>('form');

  onSubmit(): void {
    const formValue = this.form()?.value;
    if (this.form()?.invalid) {
      this.form()?.control.markAllAsTouched();
    }
    if (this.form()?.valid) {
      this.submit.emit(formValue);
    }
  }

  onClose(): void {
    this.close.emit();
  }
}
