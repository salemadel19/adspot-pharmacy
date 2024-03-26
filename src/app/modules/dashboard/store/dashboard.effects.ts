import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageHandlerService } from '../../../core/services/message-handler/message-handler.service';
import { DashboardService } from '../services/dashboard.service';
import {
  LoadDashboardPageAction,
  LoadDashboardPageFailureAction,
  LoadDashboardPageSuceessAction,
  LoadNotificationsAction,
  LoadNotificationsFailureAction,
  LoadNotificationsSuccessAction,
  OnCloseNotificationsAction,
  UpdateNotificationsFailureAction,
  UpdateNotificationsSuccessAction,
} from './dashboard.actions';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { formatDate } from '@angular/common';
import {
  IDashboard,
  IDiffusionTotalStatus,
} from '../../../core/models/typings.model';
import { loginQuery } from '../../login/store/login.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/models/store-typings.model';
import { ClientService } from '../../../core/services/client/client.service';
import { DashboardFacade } from '../services/dashboard-facade.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardEffects {
  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService,
    private messagehandler: MessageHandlerService,
    private store: Store<AppState>,
    private clientService: ClientService,
    private dashboardFacade: DashboardFacade
  ) {}

  loadDiffusionListEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadDashboardPageAction),
      withLatestFrom(this.store.select(loginQuery.getClientID)),
      switchMap(([action, client_id]) =>
        this.dashboardService.fetchDashboard(client_id, action.payload).pipe(
          map((data) => this.translateStatusToFrench(data)),
          map((dashboard) => this.calculateTotalStatus(dashboard)),

          map((data) => LoadDashboardPageSuceessAction({ payload: data })),
          catchError((err) => {
            this.messagehandler.errorHandler(`Une Erreur se produite`, err.err);
            return of(LoadDashboardPageFailureAction(err));
          })
        )
      )
    )
  );
  public loadNotificationsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadNotificationsAction),
      withLatestFrom(this.store.select(loginQuery.getClientID)),
      switchMap(([_, client_id]) =>
        this.clientService.fetchNotifications(client_id).pipe(
          map((data) => LoadNotificationsSuccessAction({ payload: data })),
          catchError((err) => {
            this.messagehandler.errorHandler(`Une Erreur se produite`, err.err);
            return of(LoadNotificationsFailureAction(err));
          })
        )
      )
    )
  );
  public updateNotificationsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OnCloseNotificationsAction),
      switchMap((action) =>
        this.clientService.updateNotifications(action.payload).pipe(
          map((notifications) =>
            UpdateNotificationsSuccessAction({ payload: notifications })
          ),
          tap((_) => this.dashboardFacade.loadDashboardNotifications()),
          catchError((err) => {
            this.messagehandler.errorHandler(`Une Erreur se produite`, err.err);
            return of(UpdateNotificationsFailureAction(err));
          })
        )
      )
    )
  );
  private translateStatusToFrench(dashboard: IDashboard): IDashboard {
    let date = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en_US');
    let copiedDiffusions = [...dashboard.diffussions];

    dashboard.diffussions = copiedDiffusions.map((diff) => {
      if (
        diff.diffusion_status === 'Accepted' &&
        diff.diffusion_end_date < date
      ) {
        return { ...diff, diffusion_status: 'Expirée' };
      }
      if (diff.diffusion_status === 'Accepted') {
        return { ...diff, diffusion_status: 'Acceptée' };
      }
      if (diff.diffusion_status === 'Pending') {
        return { ...diff, diffusion_status: 'En Attente' };
      }
      if (diff.diffusion_status === 'Rejected') {
        return { ...diff, diffusion_status: 'Refusée' };
      }

      return diff;
    });
    return dashboard;
  }
  private calculateTotalStatus(dashboard: IDashboard) {
    let date = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en_US');
    let totalStatus: IDiffusionTotalStatus = {
      pending: dashboard.diffussions.filter(
        (diff) => diff.diffusion_status === 'En Attente'
      ).length,
      active: dashboard.diffussions.filter(
        (diff) =>
          diff.diffusion_status === 'Acceptée' && diff.diffusion_end_date > date
      ).length,
      expired: dashboard.diffussions.filter(
        (diff) => diff.diffusion_status === 'Expirée'
      ).length,

      refused: dashboard.diffussions.filter(
        (diff) => diff.diffusion_status === 'Refusée'
      ).length,
    };
    return { totalStatus, dashboard };
  }
}
