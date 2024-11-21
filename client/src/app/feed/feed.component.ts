import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../shared/button/button.component';
import { InputComponent } from '../shared/input/input.component';
import { LoaderComponent } from '../shared/loader/loader.component';
import { PostsService } from '../posts.service';
import { Post, PostsResponse } from './posts-response.model';
import { PaginatorComponent } from './paginator/paginator.component';
import { PostItemComponent } from './post-item/post-item.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
  standalone: true,
  imports: [
    FormsModule,
    ButtonComponent,
    InputComponent,
    LoaderComponent,
    PaginatorComponent,
    PostItemComponent,
  ],
})
export class FeedComponent implements OnInit {
  private postsService = inject(PostsService);
  private destroyRef = inject(DestroyRef);

  isPostsLoading = false;
  postPage = 1;
  posts: Post[] = [];
  totalItems = 0;
  lastPage = 1;

  ngOnInit(): void {
    this.isPostsLoading = true;
    const subscription = this.postsService
      .getPosts()
      .subscribe((resData: PostsResponse) => {
        this.posts = resData.posts;
        this.totalItems = resData.totalItems;
        this.isPostsLoading = false;
        this.lastPage = Math.ceil(this.totalItems / 2);
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onStatusUpdateSubmit() {}

  onPrevPage(): void {}

  onNextPage(): void {}
}
