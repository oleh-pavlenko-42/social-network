import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  currentPage = input.required<number>();
  lastPage = input.required<number>();
  prevPageEvent = output();
  nextPageEvent = output();

  onPrevious(): void {
    this.prevPageEvent.emit();
  }

  onNext(): void {
    this.nextPageEvent.emit();
  }
}
