import { createAction, props } from '@ngrx/store';
import {
  IDashboard,
  IDiffusionTotalStatus,
  INotification,
} from '../../../core/models/typings.model';

export const LoadDashboardPageAction = createAction(
  '[Dashboard Page] Load Dashboard Page',
  props<{
    payload: string;
  }>()
);
export const LoadDashboardPageSuceessAction = createAction(
  '[Dashboard Page] Load Dashboard Page Success',
  props<{
    payload: {
      totalStatus: IDiffusionTotalStatus;
      dashboard: IDashboard;
    };
  }>()
);
export const LoadDashboardPageFailureAction = createAction(
  '[Dashboard Page] Load Dashboard Page Failure',
  props<{
    payload: string;
  }>()
);

export const LoadNotificationsAction = createAction(
  '[Dashboard Page] Load Notification List'
);
export const LoadNotificationsSuccessAction = createAction(
  '[Dashboard Page] Load Notifications Success',
  props<{
    payload: INotification[];
  }>()
);
export const LoadNotificationsFailureAction = createAction(
  '[Dashboard Page] Load Notifications Failure',
  props<{
    payload: string;
  }>()
);
export const OnCloseNotificationsAction = createAction(
  '[Dashboard Page] On Close a Notification',
  props<{
    payload: string;
  }>()
);
export const UpdateNotificationsSuccessAction = createAction(
  '[Dashboard Page] Update Notifications Success',
  props<{
    payload: INotification[];
  }>()
);
export const UpdateNotificationsFailureAction = createAction(
  '[Dashboard Page] Update Notifications Failure',
  props<{
    payload: string;
  }>()
);
