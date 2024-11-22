import { Component, input } from '@angular/core';
import { Post } from '../posts-response.model';
import { DatePipe } from '@angular/common';
import { ButtonComponent } from '../../shared/button/button.component';
import { RouterLink } from '@angular/router';
import { ImageComponent } from '../../shared/image/image.component';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [DatePipe, ButtonComponent, RouterLink, ImageComponent],
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.scss',
})
export class PostItemComponent {
  post = input.required<Post>();

  onStartEdit(): void {}

  onDelete(): void {}
}
