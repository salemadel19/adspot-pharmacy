import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './core/models/store-typings.model';
import { loginQuery } from './modules/login/store/login.selectors';
import {
  ActiveSidebarItemAction,
  CurrentActiveRouteAction,
} from './modules/sidebar/store/sidebar.actions';
import { sidebarQuery } from './modules/sidebar/store/sidebar.selectors';
import { BehaviorSubject } from 'rxjs';
import { SortService } from '../shared/sort.service';

@Injectable({
  providedIn: 'root',
})
export class AppFacade {
  constructor(
    private store: Store<AppState>,
    private sortService: SortService
  ) {}
  private _currentSidebarStatus$ = new BehaviorSubject<boolean>(false);
  public currentSidebarStatus$ = this._currentSidebarStatus$.asObservable();

  loggedUser$ = this.store.select(loginQuery.userLogedIn);
  user$ = this.store.select(loginQuery.getUser);
  currentRoute$ = this.store.select(sidebarQuery.currentActiveRoute);
  activeItem$ = this.store.select(sidebarQuery.ActiveSidebarItem);
  client$ = this.store.select(loginQuery.getUser);
  clientID$ = this.store.select(loginQuery.getClientID);

  public onCurrentActiveRoute(item: string) {
    this.store.dispatch(CurrentActiveRouteAction({ payload: item }));
  }
  public onMenuSelection(label: string) {
    this.store.dispatch(ActiveSidebarItemAction({ payload: label }));
  }

  public setSidebarStatusToClose(status: boolean) {
    this._currentSidebarStatus$.next(status);
  }

  public sortByDate<T>(data: T[], key: string, isSorting: boolean) {
    return this.sortService.sortByDate(data, key, isSorting);
  }
  public sortAlphabetically<T>(data: T[], key: string, isSorting: boolean) {
    return this.sortService.sortAlphabetically(data, key, isSorting);
  }

  public sortByTvStatus<T>(data: T[], key: string, isSorting: boolean) {
    return this.sortService.sortByTvStatus(data, key, isSorting);
  }
}
