import {
  Component,
  input,
  output,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { generateBase64FromImage } from '../../utils/image';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule, ButtonComponent],
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ModalFormComponent {
  title = input();
  close = output();
  submit = output();

  onSubmit(): void {
    this.submit.emit();
  }

  onClose(): void {
    this.close.emit();
  }
}
