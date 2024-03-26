import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  tap,
  map,
  catchError,
  of,
  switchMap,
  withLatestFrom,
  exhaustMap,
  mergeMap,
} from 'rxjs';
import { MessageHandlerService } from '../../../core/services/message-handler/message-handler.service';
import { ProfileService } from '../services/profile.service';
import {
  LoadUserInfoAction,
  LoadUserInfoFailureAction,
  LoadUserInfoSuceessAction,
  TryUpdatePasswordAction,
  TryUpdateUserInfoAction,
  UpdatePasswordFailureAction,
  UpdatePasswordSuccessAction,
  UpdateUserInfoFailureAction,
  UpdateUserInfoSuccessAction,
} from './profile.actions';
import { UpdateClientNameAction } from '../../login/store/login.actions';
import { IUserInfo } from '../../../core/models/typings.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/models/store-typings.model';
import { loginQuery } from '../../login/store/login.selectors';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ProfileEffects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private profileService: ProfileService,
    private messagehandler: MessageHandlerService
  ) {}
  loadUserInfoEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadUserInfoAction),
      withLatestFrom(this.store.select(loginQuery.getClientID)),
      switchMap(([action, clientID]) =>
        this.profileService.fetchInfos(clientID).pipe(
          map((data) => LoadUserInfoSuceessAction({ payload: data })),
          catchError((err) => {
            this.messagehandler.errorHandler(
              `Une Erreur se produite`,
              err
            );
            return of(LoadUserInfoFailureAction(err));
          })
        )
      )
    )
  );

  UpdateProfileSuccessEffect$ = createEffect(() =>
    this.actions$.pipe(
     
      ofType(TryUpdateUserInfoAction),
      withLatestFrom(this.store.select(loginQuery.getClientID)),
      mergeMap(([action, clientID]) =>
      this.profileService.tryUpdateInfo(clientID, action.payload).pipe(
          map((data) => UpdateUserInfoSuccessAction({ payload: data })),
          map((data) => UpdateClientNameAction({ clientName: data.payload.client_name })),
          tap(() =>
            this.messagehandler.successHandler(
              `Votre Profile a été modifié avec succès `
            )
          ),
          catchError((err) => {
            this.messagehandler.errorHandler(`Une Erreur se produite`, err.err);
            return of(UpdateUserInfoFailureAction(err));
          })
        )
      )

    )
  );

  UpdatePasswordSuccessEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TryUpdatePasswordAction),
      withLatestFrom(this.store.select(loginQuery.getClientID)),
      mergeMap(([action, clientID]) =>
      this.profileService.updatePassword(clientID, action.payload).pipe(
          map((data) => UpdatePasswordSuccessAction({ payload: data })),
          tap(() =>
            this.messagehandler.successHandler(
              `Votre Mot de Passe a été modifié avec succès `
            )
          ),
          catchError((err) => {
            this.messagehandler.errorHandler(`Une Erreur se produite`, err.err);
            return of(UpdatePasswordFailureAction(err));
          })
        )
      )

    )
  );

  
}
