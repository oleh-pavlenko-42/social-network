import { Component, input } from '@angular/core';
import { Post } from '../posts-response.model';
import { DatePipe } from '@angular/common';
import { ButtonComponent } from '../../shared/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [DatePipe, ButtonComponent, RouterLink],
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.scss',
})
export class PostItemComponent {
  post = input.required<Post>();

  onStartEdit(): void {}

  onDelete(): void {}
}
