import { Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { PostPageComponent } from './feed/post-page/post-page.component';

export const routes: Routes = [
  { path: '', component: FeedComponent },
  { path: ':postId', component: PostPageComponent },
];
