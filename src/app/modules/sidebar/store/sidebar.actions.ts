import { createAction, props } from '@ngrx/store';

export const CurrentActiveRouteAction = createAction(
  '[Sidebar Page] Get Current route ',
  props<{
    payload: string;
  }>()
);
export const ActiveSidebarItemAction = createAction(
  '[Sidebar Page] Get Active Sidebar Item ',
  props<{
    payload: string;
  }>()
);
