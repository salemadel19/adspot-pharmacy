import { createSelector } from '@ngrx/store';
import {
  AppState,
  IDashboardPageState,
} from '../../../core/models/store-typings.model';

const selectDashboardQuery = (state: AppState): IDashboardPageState =>
  state.dashboardPage;
const isDashboardLoading = createSelector(
  selectDashboardQuery,
  (dashboard) => dashboard.isDashboardLoading
);
const getTotalStatus = createSelector(
  selectDashboardQuery,
  (dashboard) => dashboard.totalStatus
);

const getDashboardPage = createSelector(
  selectDashboardQuery,
  (dashboard) => dashboard.dashboard
);
const getNotifications = createSelector(
  selectDashboardQuery,
  (dashboard) => dashboard.notifications
);

export const dashboardQuery = {
  isDashboardLoading,
  getDashboardPage,
  getTotalStatus,
  getNotifications
};
