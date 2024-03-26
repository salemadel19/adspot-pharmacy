import { createSelector } from '@ngrx/store';
import {
  AppState,
  ILoginPageState,
} from 'src/app/core/models/store-typings.model';

const selectLoginQuery = (state: AppState): ILoginPageState => state.loginPage;
const userLogedIn = createSelector(
  selectLoginQuery,
  (user) => user.isAuthenticated
);
const isLoading = createSelector(selectLoginQuery, (user) => user.isLoading);
const isResetLoading = createSelector(selectLoginQuery, (user) => user.isResetLoading);
const getToken = createSelector(
  selectLoginQuery,
  (userLoged) => userLoged.user.token
);
const getUser = createSelector(
  selectLoginQuery,
  (userLoged) => userLoged.user.clientName
);

const getClientID = createSelector(
  selectLoginQuery,
  (userLoged) => userLoged.user.clientID
);


const getErrorMessage = createSelector(
  selectLoginQuery,
  (userLoged) => userLoged.errorMessage
);

export const loginQuery = {
  userLogedIn,
  isLoading,
  isResetLoading,
  getToken,
  getUser,
  getClientID,
  getErrorMessage,
};
