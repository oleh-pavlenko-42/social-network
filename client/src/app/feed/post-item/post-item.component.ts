import {
  Component,
  DestroyRef,
  inject,
  input,
  ViewContainerRef,
} from '@angular/core';
import { Post } from '../posts-response.model';
import { DatePipe } from '@angular/common';
import { ButtonComponent } from '../../shared/button/button.component';
import { RouterLink } from '@angular/router';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { PostsService } from '../../posts.service';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [DatePipe, ButtonComponent, RouterLink],
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.scss',
})
export class PostItemComponent {
  private viewContainer = inject(ViewContainerRef);
  private destroyRef = inject(DestroyRef);
  private postsService = inject(PostsService);

  post = input.required<Post>();

  onStartEdit(): void {
    const component = this.viewContainer.createComponent(EditPostComponent);
    component.setInput('post', this.post());
    const closeSub = component.instance.close.subscribe(() => {
      component.destroy();
    });
    const submitSub = component.instance.submit.subscribe(
      (formData: FormData) => {
        this.postsService
          .editPost(this.post()._id, formData)
          .subscribe((result) => {});
        component.destroy();
      }
    );

    this.destroyRef.onDestroy(() => {
      closeSub.unsubscribe();
      submitSub.unsubscribe();
    });
  }

  onDelete(): void {
    const deleteSub = this.postsService.deletePost(this.post()._id).subscribe();

    this.destroyRef.onDestroy(() => {
      deleteSub.unsubscribe();
    });
  }
}
