import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthResponse } from './auth-response-data.model';
import {
  BehaviorSubject,
  catchError,
  delay,
  map,
  Observable,
  of,
  Subject,
  tap,
  throwError,
} from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  tokenExpirationTimer: any;
  user = new BehaviorSubject<User | null>(null);

  signup(
    email: string,
    name: string,
    password: string
  ): Observable<AuthResponse> {
    return of({ token: '123', userId: '12345' }).pipe(
      delay(1000),
      tap((resData) => {
        this.handleAuthentication(resData.userId, resData.token);
      })
    );
    return this.http
      .post<AuthResponse>('', {
        email,
        name,
        password,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(resData.userId, resData.token);
        })
      );
  }

  login(email: string, password: string): Observable<AuthResponse> {
    // return throwError(() => 'An unknown error occured.');
    return of({ token: '123', userId: '12345' }).pipe(
      delay(1000),
      tap((resData) => {
        this.handleAuthentication(resData.userId, resData.token);
      })
    );
    return this.http
      .post<AuthResponse>('', {
        email,
        password,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(resData.userId, resData.token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('user-data');
    this.user.next(null);
    this.router.navigate(['/login']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogin() {
    const userData = localStorage.getItem('user-data');
    if (!userData) {
      return;
    }
    const loadedUser: {
      id: string;
      _token: string;
      _tokenExpirationDate: Date;
    } = JSON.parse(userData);
    const userObj = new User(
      loadedUser.id,
      loadedUser._token,
      new Date(loadedUser._tokenExpirationDate)
    );
    if (userObj.token) {
      this.user.next(userObj);
      const remainingMilliseconds =
        new Date(loadedUser._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(remainingMilliseconds);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'An error occured.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(() => errorMessage);
  }

  private handleAuthentication(userId: string, token: string) {
    const remainingMilliseconds = 60 * 60 * 1000;
    const tokenExpirationDate = new Date(
      new Date().getTime() + remainingMilliseconds
    );
    const user = new User(userId, token, tokenExpirationDate);
    this.user.next(user);
    this.autoLogout(remainingMilliseconds);
    localStorage.setItem('user-data', JSON.stringify(user));
  }
}
