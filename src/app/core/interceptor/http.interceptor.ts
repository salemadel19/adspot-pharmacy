import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { catchError, first, flatMap } from 'rxjs/operators';
import { LoginFacade } from 'src/app/modules/login/services/login-facade.service';
import { AppState } from '../models/store-typings.model';
import { Store } from '@ngrx/store';
import { loginQuery } from '../../modules/login/store/login.selectors';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  public token = '';
  constructor(
    private store: Store<AppState>,
    private loginFacade: LoginFacade
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(loginQuery.getToken).pipe(
      first(),
      flatMap((token) => {
        if (token) {
          request = request.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
          });
        }
        return next.handle(request).pipe(
          catchError((err: HttpErrorResponse) => {
            if (err.status === 401 || err.status === 403) {
              this.loginFacade.logOut();
              localStorage.removeItem('token');
            }
            return throwError(err);
          })
        );
      })
    );
  }
}
