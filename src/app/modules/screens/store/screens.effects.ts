import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  map,
  catchError,
  of,
  switchMap,
  withLatestFrom,
  tap,
  EMPTY,
} from 'rxjs';

import { MessageHandlerService } from '../../../core/services/message-handler/message-handler.service';
import { ScreensService } from '../services/screens.service';
import {
  AddScreenToFolderAction,
  CreateScreensFolderSuccessAction,
  DeleteFolderFailureAction,
  DeleteFolderSuccessAction,
  LoadScreenFolderFailureAction,
  LoadScreenFolderSuccessAction,
  LoadScreenListAction,
  LoadScreenListFailureAction,
  LoadScreenListSuceessAction,
  LoadScreensCurrentDiffusionFailureAction,
  LoadScreensCurrentDiffusionSuccessAction,
  LoadScreensFoldersAction,
  LoadScreenFoldersSuccessAction,
  OnAcceptDeleteFolderAction,
  OnFolderSelectionAction,
  OnScreenSelection,
  OnScreensFolderCreationAction,
  UpdateScreenFolderFailureAction,
  UpdateScreenFolderSuccessAction,
} from './screens.actions';
import { IScreenFolder, ITvsStatus } from '../../../core/models/typings.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/models/store-typings.model';
import { loginQuery } from '../../login/store/login.selectors';
import { ScreensFacade } from '../services/screens-facade.service';
import { screensQuery } from './screens.selectors';

@Injectable({
  providedIn: 'root',
})
export class ScreensEffects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private screensService: ScreensService,
    private messagehandler: MessageHandlerService,
    private screenFacade: ScreensFacade
  ) {}
  loadScreenListEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadScreenListAction),
      withLatestFrom(
        this.store.select(loginQuery.getClientID),
        this.store.select(screensQuery.getScreens)
      ),

      switchMap(([action, client_id, screens]) => {
        if (screens.tvs && screens.tvs.length > 0) {
          return of(LoadScreenListSuceessAction({ payload: screens }));
        } else {
          return this.screensService.fetchScreens(client_id).pipe(
            map((data) => this.checkLocationExistence(data)),
            map((data) => this.autoSelectFirstScreen(data)),
            map((data) => LoadScreenListSuceessAction({ payload: data })),
            catchError((err) => {
              this.messagehandler.errorHandler(
                `Une Erreur se produite`,
                err.err
              );
              return of(LoadScreenListFailureAction(err));
            })
          );
        }
      })
    )
  );
  loadCurrentScreensDiffusionEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OnScreenSelection),
      switchMap((action) => {
        return this.screensService
          .fetchTvsCurrentDiffusion(action.payload.screen.tv_id)
          .pipe(
            map((data) =>
              LoadScreensCurrentDiffusionSuccessAction({ payload: data })
            ),
            catchError((err) => {
              this.messagehandler.errorHandler(
                `Une Erreur se produite`,
                err.err
              );
              return of(LoadScreensCurrentDiffusionFailureAction(err));
            })
          );
      })
    )
  );
  public createScreenFolderEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OnScreensFolderCreationAction),
      withLatestFrom(this.store.select(screensQuery.getScreensFolders)),
      switchMap(([action, folders]) =>
        this.screensService.createScreenFolder(action.payload).pipe(
          map((data) => CreateScreensFolderSuccessAction({ payload: data })),
          map((data) => this.addNewFolder(data.payload[0], folders)),
          map((data) => LoadScreenFoldersSuccessAction({ payload: data })),
          tap(() =>
            this.messagehandler.successHandler(
              `Votre Dossier a été creé avec succés `
            )
          ),
          catchError((err) => {
            this.messagehandler.errorHandler(`Une Erreur se produite`, err.err);
            return of(CreateScreensFolderSuccessAction(err));
          })
        )
      )
    )
  );
  public loadScreensFoldersEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadScreensFoldersAction),
      withLatestFrom(
        this.store.select(loginQuery.getClientID),
        this.store.select(screensQuery.getScreensFolders)
      ),

      switchMap(([action, client_id, folders]) => {
        if (folders && folders.length > 0) {
          return of(LoadScreenFoldersSuccessAction({ payload: folders }));
        } else {
          return this.screensService.fetchScreenFolders(client_id).pipe(
            map((data) => this.removeFoldersDuplicateIds(data)),
            map((data) => LoadScreenFoldersSuccessAction({ payload: data })),
            catchError((err) => {
              this.messagehandler.errorHandler(
                `Une Erreur se produite`,
                err.err
              );
              return of(LoadScreenFoldersSuccessAction(err));
            })
          );
        }
      })
    )
  );

  public updateScreenFolderEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddScreenToFolderAction),
      withLatestFrom(this.store.select(screensQuery.getScreensFolders)),
      switchMap(([action, folders]) =>
        this.screensService.updateScreenFolder(action.payload).pipe(
          map((data) => UpdateScreenFolderSuccessAction({ payload: data })),
          map((data) => this.updateFolder(data.payload[0], folders)),
          map((folders) =>
            LoadScreenFoldersSuccessAction({ payload: folders })
          ),
          tap(() =>
            this.messagehandler.successHandler(
              `Votre Dossier a été modifié avec succés `
            )
          ),
          catchError((err) => {
            this.messagehandler.errorHandler(`Une Erreur se produite`, err.err);
            return of(UpdateScreenFolderFailureAction(err));
          })
        )
      )
    )
  );
  public loadFolderScreensEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OnFolderSelectionAction),
      switchMap((action) =>
        this.screensService
          .fetchScreenFolder(action.payload.client_id, action.payload.folder_id)
          .pipe(
            map((data) => LoadScreenFolderSuccessAction({ payload: data })),
            catchError((err) => {
              this.messagehandler.errorHandler(
                `Une Erreur se produite`,
                err.err
              );
              return of(LoadScreenFolderFailureAction(err));
            })
          )
      )
    )
  );
  public deleteScreenFolderEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OnAcceptDeleteFolderAction),
      withLatestFrom(this.store.select(screensQuery.getScreensFolders)),
      switchMap(([action, folders]) =>
        this.screensService.deleteScreenFolder(action.payload.folder_id).pipe(
          map((data) => DeleteFolderSuccessAction({ payload: data })),
          map((_) => this.deleteFolder(action.payload.folder_id, folders)),
          map((folders) =>
            LoadScreenFoldersSuccessAction({ payload: folders })
          ),
          tap(() =>
            this.messagehandler.successHandler(
              `Votre Dossier a été supprimé avec succés `
            )
          ),
          catchError((err) => {
            this.messagehandler.errorHandler(`Une Erreur se produite`, err.err);
            return of(DeleteFolderFailureAction(err));
          })
        )
      )
    )
  );
  private checkLocationExistence(data: ITvsStatus) {
    data.tvs.map((tv) =>
      tv.contact_location?.x && tv.contact_location?.y
        ? (tv.location_existence = true)
        : (tv.location_existence = false)
    );
    return data;
  }
  private removeFoldersDuplicateIds(folders: IScreenFolder[]) {
    return folders.map((folder) => ({
      ...folder,
      tv_ids: [...new Set(folder.tv_ids)],
    }));
  }
  private autoSelectFirstScreen(data: ITvsStatus) {
    data.tvs = data.tvs.map((tv, i) => {
      i === 0 ? (tv.isSelected = true) : (tv.isSelected = false);
      return tv;
    });
    return data;
  }
  private addNewFolder(folder: IScreenFolder, folders: IScreenFolder[]) {
    let newFolders = [...folders, folder];
    return newFolders;
  }
  private deleteFolder(folder_id: string, folders: IScreenFolder[]) {
    folders = folders.filter((folder) => folder.folder_id !== folder_id);
    return folders;
  }
  private updateFolder(folder: IScreenFolder, folders: IScreenFolder[]) {
    let index = folders.findIndex((f) => f.folder_id === folder.folder_id);
    if (index !== -1) {
      let updatedFolder = [...folders];
      updatedFolder[index] = folder;
      return updatedFolder;
    }

    return folders;
  }
}
