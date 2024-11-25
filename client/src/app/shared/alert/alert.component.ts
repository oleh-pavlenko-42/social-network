import {
  booleanAttribute,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AlertComponent {}
