import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Post, PostResponse, PostsResponse } from './feed/posts-response.model';
import { delay, exhaustMap, Observable, of, take } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getPosts(): Observable<PostsResponse> {
    return this.authService.user.pipe(
      delay(2000),
      take(1),
      exhaustMap((user) => {
        return of<PostsResponse>({
          totalItems: 5,
          posts: [
            {
              _id: '1',
              creator: {
                name: 'Oleh',
              },
              title: 'First Post',
              content: 'Dummy post content',
              imageUrl: 'images/boat.jpg',
              createdAt: new Date(),
            },
            {
              _id: '2',
              creator: {
                name: 'Oleh',
              },
              title: 'Second Post',
              content: 'Dummy post content',
              imageUrl: 'images/car.jpg',
              createdAt: new Date(),
            },
          ],
        });
        return this.http.get<PostsResponse>('http://localhost:3000', {
          params: new HttpParams().set('auth', user?.token || ''),
        });
      }),
      delay(2000)
    );
  }

  getPost(postId: string): Observable<PostResponse> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return of<PostResponse>({
          post: {
            _id: '1',
            creator: {
              name: 'Oleh',
            },
            title: 'First Post',
            content: 'Dummy post content',
            imageUrl: 'images/boat.jpg',
            createdAt: new Date(),
          },
        });
        return this.http.get<PostResponse>('http://localhost:3000', {
          params: new HttpParams().set('auth', user?.token || ''),
        });
      }),
      delay(2000)
    );
  }
}
