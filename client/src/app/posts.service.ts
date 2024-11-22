import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Post, PostResponse, PostsResponse } from './feed/posts-response.model';
import { delay, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private http = inject(HttpClient);

  getPosts(): Observable<PostsResponse> {
    // return this.http.get<PostsResponse>('http://localhost:3000');
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
    }).pipe(delay(2000));
  }

  getPost(postId: string): Observable<PostResponse> {
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
    }).pipe(delay(2000));
  }
}
