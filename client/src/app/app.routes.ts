import { Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { PostPageComponent } from './feed/post-page/post-page.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  { path: '', component: FeedComponent },
  { path: 'login', component: LoginComponent },
  { path: 'feed/:postId', component: PostPageComponent },
];
