import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/models/store-typings.model';
import {
  LoadDashboardPageAction,
  LoadNotificationsAction,
  OnCloseNotificationsAction,
} from '../store/dashboard.actions';
import { dashboardQuery } from '../store/dashboard.selectors';
import { loginQuery } from '../../login/store/login.selectors';

@Injectable({
  providedIn: 'root',
})
export class DashboardFacade {
  constructor(private store: Store<AppState>) {}
  isDashboardLoading$ = this.store.select(dashboardQuery.isDashboardLoading);
  dashboardPage$ = this.store.select(dashboardQuery.getDashboardPage);
  totalStatus$ = this.store.select(dashboardQuery.getTotalStatus);
  notifications$ = this.store.select(dashboardQuery.getNotifications);
  client$ = this.store.select(loginQuery.getUser);
  clientID$ = this.store.select(loginQuery.getClientID);
  public loadDashboardData(periode: string) {
    this.store.dispatch(LoadDashboardPageAction({ payload: periode }));
  }
  public loadDashboardNotifications() {
    this.store.dispatch(LoadNotificationsAction());
  }
  public onCloseNotification(notification_id: string) {
    this.store.dispatch(
      OnCloseNotificationsAction({ payload: notification_id })
    );
  }
}
