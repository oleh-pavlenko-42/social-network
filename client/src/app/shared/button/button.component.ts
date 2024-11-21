import { Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[appButton]',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'button',
    '[class.button--danger]': `this.design() === 'danger'`,
    '[class.button--raised]': `this.design() === 'raised' || this.mode() === 'raised'`,
    '[class.button--accent]': `this.design() === 'accent'`,
    '[class.button--flat]': `this.mode() === 'flat'`,
  },
})
export class ButtonComponent {
  design = input('');
  mode = input('');
}
