import { Component, input, output, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { generateBase64FromImage } from '../../utils/image';

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
  submit = output<FormData>();
  form = viewChild<NgForm>('form');
  imageFile!: File | null | undefined;
  imagePreview!: string;

  handleFileInput(e: Event) {
    this.imageFile = (e.target as HTMLInputElement).files?.item(0);
    if (this.imageFile) {
      generateBase64FromImage(this.imageFile).then((result) => {
        this.imagePreview = result as string;
      });
    }
  }

  onSubmit(): void {
    if (this.form()?.invalid) {
      this.form()?.control.markAllAsTouched();
    }
    if (this.form()?.valid) {
      const title = this.form()?.value['title'];
      const content = this.form()?.value['content'];
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (this.imageFile) {
        formData.append('image', this.imageFile, this.imageFile?.name);
      }
      this.submit.emit(formData);
    }
  }

  onClose(): void {
    this.close.emit();
  }
}
