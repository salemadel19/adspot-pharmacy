import { Injectable } from '@angular/core';
import { ILoginCredentials,IClientEmail } from 'src/app/core/models/typings.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/models/store-typings.model';
import {
  TokenDoesntExistAction,
  TryLoginUserAction,
  logOutAction,
  RouteIfAlreadyLoggedAction,
  TryResetPasswordAction,
} from '../store/login.actions';
import { Router } from '@angular/router';
import { loginQuery } from '../store/login.selectors';

@Injectable({
  providedIn: 'root',
})
export class LoginFacade {
  constructor(private store: Store<AppState>, private router: Router) {}
  isLoading$ = this.store.select(loginQuery.isLoading);
  isResetLoading$ = this.store.select(loginQuery.isResetLoading);

  public tryLoginUser(user: ILoginCredentials) {
    this.store.dispatch(TryLoginUserAction({ payload: user }));
  }
  public tryResetPassword(user: IClientEmail) {
    this.store.dispatch(TryResetPasswordAction({ payload: user }));
  }
  public logOut() {
    this.router.navigate(['/login'], { replaceUrl: true }).then((res) => {
      if (res === true) {
        this.store.dispatch(logOutAction());
      }
    });
  }
  public checkAlreadyLoggedIn() {
    const token = localStorage.getItem('token');

    if (token) {
      this.store.dispatch(RouteIfAlreadyLoggedAction({ payload: token }));
    } else {
      this.store.dispatch(TokenDoesntExistAction());
      this.router.navigate(['/login']);
    }
  }
}
