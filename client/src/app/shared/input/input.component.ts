import {
  Component,
  ElementRef,
  input,
  model,
  OnInit,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'input',
  },
  imports: [FormsModule],
})
export class InputComponent implements OnInit {
  label = input();
  name = input.required<string>();
  control = input.required();
  rows = input();
  placeholder = input('');
  modelValue = model();
  inputRef = viewChild<ElementRef<NgModel>>('inputRef');

  ngOnInit(): void {
    setTimeout(() => {
      this.modelValue.set(this.inputRef());
    }, 0);
  }
}
