import { Action, createReducer, on } from '@ngrx/store';

import { IDashboardPageState } from '../../../core/models/store-typings.model';
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

export const dashboardInitialState: IDashboardPageState = {
  isDashboardLoading: false,
  totalStatus: {
    active: 0,
    expired: 0,
    pending: 0,
    refused: 0,
  },
  dashboard: {
    diffussions: [],
    passage: 0,
    passagePerDate: [],
    passagePerRange: [],
    passageToday: 0,
    total_spent: 0,
    total_tvs: 0,
    tvs: [],
    tvsOffline: 0,
    tvsOnline: 0,
  },
  errorMessage: '',
  notifications: [],
};

const dashboardPageReducer = createReducer(
  dashboardInitialState,
  on(LoadDashboardPageAction, (state) => ({
    ...state,
    isDashboardLoading: true,
  })),
  on(LoadDashboardPageSuceessAction, (state, { payload }) => ({
    ...state,
    totalStatus: payload.totalStatus,
    dashboard: payload.dashboard,
    isDashboardLoading: false,
  })),
  on(LoadDashboardPageFailureAction, (state, { payload }) => ({
    ...state,
    isDashboardLoading: false,
    errorMessage: payload,
  })),
  on(LoadNotificationsAction, (state) => ({
    ...state,
    isDashboardLoading: true,
  })),
  on(LoadNotificationsSuccessAction, (state, { payload }) => ({
    ...state,
    notifications: payload,
    isDashboardLoading: false,
  })),
  on(LoadNotificationsFailureAction, (state, { payload }) => ({
    ...state,
    errorMessage: payload,
    isDashboardLoading: false,
  })),
  on(OnCloseNotificationsAction, (state) => ({
    ...state,
    isDashboardLoading: true,
  })),
  on(UpdateNotificationsSuccessAction, (state, { payload }) => ({
    ...state,
    isDashboardLoading: false,
  })),
  on(UpdateNotificationsFailureAction, (state, { payload }) => ({
    ...state,
    errorMessage: payload,
    isDashboardLoading: false,
  }))
);

export function dashboardPageRootReducer(
  state: IDashboardPageState | undefined,
  action: Action
): IDashboardPageState {
  return dashboardPageReducer(state, action);
}
