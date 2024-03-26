import { Injectable } from '@angular/core';
import { AppState } from '../../../core/models/store-typings.model';
import { Store } from '@ngrx/store';
import {
  LoadUserInfoAction,
  TryUpdatePasswordAction,
  TryUpdateUserInfoAction,
} from '../store/profile.actions';
import { profileQuery } from '../store/profile.selectors';
import { IUserInfo, IUserPwd } from 'src/app/core/models/typings.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileFacade {
  constructor(private store: Store<AppState>) {}
  isUserInfoLoading$ = this.store.select(profileQuery.isUserInfoLoading);
  userInfos$ = this.store.select(profileQuery.getUserInfo);
  screensCount$ = this.store.select(profileQuery.getScreensCount);
  maxBudget$ = this.store.select(profileQuery.getMaxBudget);
  contracts$ = this.store.select(profileQuery.getContracts);
  invoices$ = this.store.select(profileQuery.getInvoices);
  totalScreens$ = this.store.select(profileQuery.getTotalScreens);

  public loadUserInfo() {
    this.store.dispatch(LoadUserInfoAction());
  }
  public tryUpdateUserInfo(info: IUserInfo) {
    this.store.dispatch(TryUpdateUserInfoAction({ payload: info }));
  }
  public tryUpdatePassword(info: IUserPwd) {
    this.store.dispatch(TryUpdatePasswordAction({ payload: info }));
  }
}
