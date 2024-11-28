import { Component, input, output, viewChild } from '@angular/core';
import { generateBase64FromImage } from '../../utils/image';
import { Post } from '../posts-response.model';
import { ModalFormComponent } from '../../shared/modal-form/modal-form.component';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [ModalFormComponent, FormsModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss',
})
export class EditPostComponent {
  close = output();
  submit = output<FormData>();
  post = input.required<Post>();
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

  onClose() {
    this.close.emit();
  }

  onSubmit() {
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
}
