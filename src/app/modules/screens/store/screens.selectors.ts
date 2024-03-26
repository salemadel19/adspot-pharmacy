import { createSelector } from '@ngrx/store';
import {
  AppState,
  IScreensPageState,
} from 'src/app/core/models/store-typings.model';

const selectScreensQuery = (state: AppState): IScreensPageState =>
  state.screensPage;
const isScreenListLoading = createSelector(
  selectScreensQuery,
  (screen) => screen.isScreenListLoading
);
const getScreens = createSelector(
  selectScreensQuery,
  (screen) => screen.screens
);
const getScreenList = createSelector(
  selectScreensQuery,
  (screen) => screen.screens.tvs
);
const getTotalScreens = createSelector(
  selectScreensQuery,
  (screen) => screen.screens.total_tvs
);
const getScreenDeatils = createSelector(
  selectScreensQuery,
  (screen) => screen.screenDetails
);
const getSelectedScreenFolders = createSelector(
  selectScreensQuery,
  (screen) => screen.createdFolder
);
const getScreensFolders = createSelector(
  selectScreensQuery,
  (screen) => screen.folders
);
const isFolderLoading = createSelector(
  selectScreensQuery,
  (screen) => screen.isFoldersLoading
);
const getCurrentScreensDiffusion = createSelector(
  selectScreensQuery,
  (screen) => screen.currentScreensDiffusion
);
export const screensQuery = {
  isScreenListLoading,
  getScreenList,
  getTotalScreens,
  getScreenDeatils,
  getSelectedScreenFolders,
  getScreensFolders,
  isFolderLoading,
  getCurrentScreensDiffusion,
  getScreens
};
