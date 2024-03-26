import { Injectable } from '@angular/core';
import { AppState } from '../../../core/models/store-typings.model';
import { Store } from '@ngrx/store';
import {
  AddScreenToFolderAction,
  ClearScreensCurrentDiffusionAction,
  LoadScreenListAction,
  LoadScreensFoldersAction,
  OnAcceptDeleteFolderAction,
  OnFolderSelectionAction,
  OnScreenSelection,
  OnScreensFolderCreationAction,
} from '../store/screens.actions';
import { screensQuery } from '../store/screens.selectors';
import {
  IFolderCreation,
  IScreenFolder,
  ITvs,
} from '../../../core/models/typings.model';
import { loginQuery } from '../../login/store/login.selectors';

@Injectable({
  providedIn: 'root',
})
export class ScreensFacade {
  constructor(private store: Store<AppState>) {}
  isScreenListLoading$ = this.store.select(screensQuery.isScreenListLoading);
  screens$ = this.store.select(screensQuery.getScreenList);
  totalScreens$ = this.store.select(screensQuery.getTotalScreens);
  screenDetails$ = this.store.select(screensQuery.getScreenDeatils);
  selectedDiffusionFolders$ = this.store.select(
    screensQuery.getSelectedScreenFolders
  );
  screenFolders$ = this.store.select(screensQuery.getScreensFolders);
  isFolderLoading$ = this.store.select(screensQuery.isFolderLoading);
  clientID$ = this.store.select(loginQuery.getClientID);
  currentScreensDiffusions$ = this.store.select(
    screensQuery.getCurrentScreensDiffusion
  );

  public loadScreenList() {
    this.store.dispatch(LoadScreenListAction());
  }
  public onScreenSelection(screen: ITvs, folders: IScreenFolder[]) {
    this.store.dispatch(OnScreenSelection({ payload: { screen, folders} }));
  }
  public clearScreensCurrentDiffusion() {
    this.store.dispatch(ClearScreensCurrentDiffusionAction());
  }

  public createScreenFolder({
    folder_title,
    folder_description,
    client_id,
  }: IFolderCreation) {
    this.store.dispatch(
      OnScreensFolderCreationAction({
        payload: {
          client_id: client_id,
          folder_title: folder_title,
          folder_description: folder_description,
        },
      })
    );
  }
  public loadScreensFolders() {
    this.store.dispatch(LoadScreensFoldersAction());
  }
  public addScreenToAFolder(folder: IScreenFolder) {
    this.store.dispatch(AddScreenToFolderAction({ payload: folder }));
  }
  public onFolderSelection(client_id: string, folder_id: string) {
    this.store.dispatch(
      OnFolderSelectionAction({ payload: { client_id, folder_id } })
    );
  }
  public onAcceptDeleteFolder(folder_id: string, client_id: string) {
    this.store.dispatch(
      OnAcceptDeleteFolderAction({ payload: { folder_id, client_id } })
    );
  }
}
