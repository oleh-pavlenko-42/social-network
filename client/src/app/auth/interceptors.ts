import {
  HttpEvent,
  HttpHandlerFn,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  return authService.user.pipe(
    take(1),
    exhaustMap((user) => {
      if (!user) {
        return next(req);
      }
      const modifiedReq = req.clone({
        headers: new HttpHeaders().set(
          'Authorization',
          'Bearer ' + user?.token || ''
        ),
      });
      return next(modifiedReq);
    })
  );
}
