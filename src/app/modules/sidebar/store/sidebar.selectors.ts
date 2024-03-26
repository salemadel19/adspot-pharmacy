import { createSelector } from '@ngrx/store';
import {
  AppState,
  ISidebarPageState,
} from 'src/app/core/models/store-typings.model';

const selectSidebarQuery = (state: AppState): ISidebarPageState =>
  state.sidebar;
const currentActiveRoute = createSelector(
  selectSidebarQuery,
  (sidebar) => sidebar.route
);
const ActiveSidebarItem = createSelector(
  selectSidebarQuery,
  (sidebar) => sidebar.activeItme
);

export const sidebarQuery = {
  currentActiveRoute,
  ActiveSidebarItem,
};
