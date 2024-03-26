import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { loginPageRootReducer } from './modules/login/store/login.reducer';
import { AppState } from './core/models/store-typings.model';
import { environment } from '../environments/environment';
import { screensPageRootReducer } from './modules/screens/store/screens.reducer';
import { sidebarPageRootReducer } from './modules/sidebar/store/sidebar.reducer';
import { dashboardPageRootReducer } from './modules/dashboard/store/dashboard.reducer';
import { profilePageRootReducer } from './modules/profile/store/profile.reducer';


export const reducers: ActionReducerMap<AppState> = {
  sidebar: sidebarPageRootReducer,
  loginPage: loginPageRootReducer,
  screensPage: screensPageRootReducer,
  dashboardPage: dashboardPageRootReducer,
  profilePage: profilePageRootReducer,
};
export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
