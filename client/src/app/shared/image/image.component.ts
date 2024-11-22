import {
  booleanAttribute,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
  host: {
    class: 'image',
    '[style.background-image]': 'this.backgroundImage()',
    '[style.background-size]': 'this.backgroundSize()',
    '[style.background-position]': 'this.backgroundPosition()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ImageComponent {
  imageUrl = input.required<string>();
  contain = input(false, { transform: booleanAttribute });
  left = input(false, { transform: booleanAttribute });

  backgroundImage = computed(() => `url(${this.imageUrl()})`);
  backgroundSize = computed(() => (this.contain() ? 'contain' : 'cover'));
  backgroundPosition = computed(() => (this.left() ? 'left' : 'center'));
}
