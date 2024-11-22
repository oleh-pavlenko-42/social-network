import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../shared/button/button.component';
import { InputComponent } from '../shared/input/input.component';
import { LoaderComponent } from '../shared/loader/loader.component';
import { PostsService } from '../posts.service';
import { Post, PostsResponse } from './posts-response.model';
import { PaginatorComponent } from './paginator/paginator.component';
import { PostItemComponent } from './post-item/post-item.component';
import { ModalFormComponent } from '../shared/modal-form/modal-form.component';

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
  private viewContainer = inject(ViewContainerRef);

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

  openNewPostModal(): void {
    const component = this.viewContainer.createComponent(ModalFormComponent);
    component.setInput('title', 'New Post');
    const closeSub = component.instance.close.subscribe(() => {
      component.destroy();
    });
    const submitSub = component.instance.submit.subscribe((formData) => {
      console.log('title', formData.get('title'));
      console.log('content', formData.get('content'));
      console.log('image', formData.get('image'));
      component.destroy();
    });
    this.destroyRef.onDestroy(() => {
      closeSub.unsubscribe();
      submitSub.unsubscribe();
    });
  }
}
