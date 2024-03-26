import { Action, createReducer, on } from '@ngrx/store';
import { ISidebarPageState } from '../../../core/models/store-typings.model';
import {
  ActiveSidebarItemAction,
  CurrentActiveRouteAction,
} from './sidebar.actions';

export const sidebarInitialState: ISidebarPageState = {
  route: '',
  activeItme: '',
};

const sidebarPageReducer = createReducer(
  sidebarInitialState,
  on(CurrentActiveRouteAction, (state, { payload }) => ({
    ...state,
    route: payload,
  })),
  on(ActiveSidebarItemAction, (state, { payload }) => ({
    ...state,
    activeItme: payload,
  }))
);

export function sidebarPageRootReducer(
  state: ISidebarPageState | undefined,
  action: Action
): ISidebarPageState {
  return sidebarPageReducer(state, action);
}
