import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { PostsService } from '../../posts.service';
import { Post } from '../posts-response.model';
import { DatePipe } from '@angular/common';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { ImageComponent } from '../../shared/image/image.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-post-page',
  standalone: true,
  imports: [DatePipe, LoaderComponent, ImageComponent],
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.scss',
})
export class PostPageComponent implements OnInit {
  private postsService = inject(PostsService);
  private destroyRef = inject(DestroyRef);

  isLoading = false;
  postId = input.required<string>();
  post!: Post;

  ngOnInit(): void {
    this.isLoading = true;
    const subscription = this.postsService
      .getPost(this.postId())
      .pipe(
        map((resData) => {
          return {
            ...resData.post,
            imageUrl: `http://localhost:8080/${resData.post.imageUrl}`,
          };
        })
      )
      .subscribe((post) => {
        this.post = post;
        this.isLoading = false;
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
