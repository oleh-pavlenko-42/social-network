import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Post, PostResponse, PostsResponse } from './feed/posts-response.model';
import { delay, exhaustMap, Observable, of, Subject, take, tap } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  posts = new Subject();

  getPosts(): Observable<PostsResponse> {
    return this.http.get<PostsResponse>('http://localhost:8080/feed/posts', {
      responseType: 'json',
    });
    // return this.authService.user.pipe(
    //   take(1),
    //   exhaustMap((user) => {
    //     return of<PostsResponse>({
    //       totalItems: 5,
    //       posts: [
    //         {
    //           _id: '1',
    //           creator: {
    //             name: 'Oleh',
    //           },
    //           title: 'First Post',
    //           content: 'Dummy post content',
    //           imageUrl: 'images/boat.jpg',
    //           createdAt: new Date(),
    //         },
    //         {
    //           _id: '2',
    //           creator: {
    //             name: 'Oleh',
    //           },
    //           title: 'Second Post',
    //           content: 'Dummy post content',
    //           imageUrl: 'images/car.jpg',
    //           createdAt: new Date(),
    //         },
    //       ],
    //     });
    //   })
    // );
  }

  getPost(postId: string): Observable<PostResponse> {
    return this.http.get<PostResponse>(
      `http://localhost:8080/feed/post/${postId}`
    );
  }

  addPost(formData: FormData) {
    return this.http.post('http://localhost:8080/feed/post', formData);
  }

  editPost(postId: string, formData: FormData) {
    return this.http.put(`http://localhost:8080/feed/post/${postId}`, formData);
  }

  deletePost(postId: string): Observable<{ message: string }> {
    return this.http
      .delete<{ message: string }>(`http://localhost:8080/feed/post/${postId}`)
      .pipe(
        tap((res) => {
          this.posts.next(res);
        })
      );
  }
}
