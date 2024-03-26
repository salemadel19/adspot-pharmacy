import { createSelector } from '@ngrx/store';
import {
  AppState,
  IProfilePageState,
} from 'src/app/core/models/store-typings.model';

const selectUserInfoQuery = (state: AppState): IProfilePageState =>
  state.profilePage;
const isUserInfoLoading = createSelector(
  selectUserInfoQuery,
  (info) => info.isUserInfoLoading
);
const getUserInfo = createSelector(
  selectUserInfoQuery,
  (user) => user.userInfo.infos
);

const getMaxBudget = createSelector(
  selectUserInfoQuery,
  (user) => user.userInfo.maxBudget
);
const getTotalScreens = createSelector(
  selectUserInfoQuery,
  (user) => user.userInfo.totalScreens
);

const getScreensCount = createSelector(
  selectUserInfoQuery,
  (user) => user.userInfo.screensCount
);
const getContracts = createSelector(
  selectUserInfoQuery,
  (user) => user.userInfo.contracts
);
const getInvoices = createSelector(
  selectUserInfoQuery,
  (user) => user.userInfo.invoices
);

export const profileQuery = {
    isUserInfoLoading,
    getUserInfo,
    getMaxBudget,
    getScreensCount,
    getContracts,
    getTotalScreens,
    getInvoices
};
