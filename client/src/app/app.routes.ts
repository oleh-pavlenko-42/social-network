import { Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { PostPageComponent } from './feed/post-page/post-page.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

export const routes: Routes = [
  { path: '', component: FeedComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'feed/:postId', component: PostPageComponent },
];
