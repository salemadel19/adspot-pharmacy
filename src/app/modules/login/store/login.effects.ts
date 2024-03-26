import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  map,
  catchError,
  of,
  exhaustMap,
  tap,
  delay,
  finalize,
  EMPTY,
} from 'rxjs';
import { LoginService } from '../services/login.service';
import {
  LoginFailureAction,
  LoginSuccessAction,
  TokenExistsAction,
  TryLoginUserAction,
  logOutAction,
  RouteIfAlreadyLoggedAction,
  TryResetPasswordAction,
  ResetPasswordSuccessAction,
  ResetPasswordFailureAction,
} from './login.actions';
import { ILoggedUser } from '../../../core/models/typings.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginFacade } from '../services/login-facade.service';
import { Router } from '@angular/router';
import { MessageHandlerService } from '../../../core/services/message-handler/message-handler.service';
@Injectable({
  providedIn: 'root',
})
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private messagehandler: MessageHandlerService,
    private loginFacade: LoginFacade,
    private router: Router
  ) {}

  loadTokenEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TryLoginUserAction),
      exhaustMap((action) =>
        this.loginService.tryLogin(action.payload).pipe(
          map((user) => this.mapUserDataToAction(user.accessToken)),
          map((user) => LoginSuccessAction({ payload: user })),
          catchError((err) => {
            this.messagehandler.errorHandler('Erreur Identification', err);
            return of(LoginFailureAction({ payload: err })).pipe(
              delay(3000),
              finalize(() => {
                this.messagehandler.clear();
                return EMPTY;
              })
            );
          })
        )
      )
    )
  );
  loginSuccessEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LoginSuccessAction),
        tap((userLoged) => {
          if (!userLoged.payload.accessToken) {
            return this.loginFacade.logOut();
          }
          localStorage.setItem('token', userLoged.payload.accessToken);
          this.router.navigate(['/dashboard']);
        }),
        catchError((err) => {
          this.messagehandler.errorHandler('Erreur Identification', err);
          return EMPTY;
        })
      ),

    { dispatch: false }
  );
  logOutEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logOutAction),
      tap(() => {
        localStorage.removeItem('token'), this.router.navigate(['/login']);
      }),
      catchError(() => EMPTY)
    )
  );
  ifLoggedInRouteEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RouteIfAlreadyLoggedAction),
      map((action) => this.mapUserDataToAction(action.payload)),
      map((user) => TokenExistsAction({ payload: user })),
      tap(() => this.router.navigate(['/dashboard']))
    )
  );

  private mapUserDataToAction(token: string) {
    const decodedToken = this.decodeToken(token);
    const clientName = decodedToken['client_name'];

    const clientID = decodedToken['client_id'];
    return {
      clientID: clientID,
      clientName: clientName,
      accessToken: token,
    } as ILoggedUser;
  }
  private decodeToken(token: string): any {
    const jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(token);
  }

  resetPasswordEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TryResetPasswordAction),
      exhaustMap((action) =>
        this.loginService.tryResetPassword(action.payload).pipe(
          map((data) => ResetPasswordSuccessAction()),
          tap(() => {
            this.messagehandler.successHandler(` Votre demande a été envoyée`);
          }),
          catchError((err) => {
            this.messagehandler.errorHandler(`Une Erreur se produite`, err.err);
            return of(ResetPasswordFailureAction(err));
          })
          
        )
      )
    )
  );
}
