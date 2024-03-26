import { createAction, props } from '@ngrx/store';
import {
  IUserInfo,IProfileInfo, IUserPwd
} from '../../../core/models/typings.model';

export const LoadUserInfoAction = createAction(
  '[Profile Page] Load User Info'
);
export const LoadUserInfoSuceessAction = createAction(
  '[Profile Page] Load User Info Success',
  props<{
    payload: IProfileInfo;
  }>()
);
export const LoadUserInfoFailureAction = createAction(
  '[Profile Page] Load User Info Failure',
  props<{
    payload: string;
  }>()
);
export const TryUpdateUserInfoAction = createAction(
  '[Profile Page] Try Update User Info',
  props<{
    payload: IUserInfo;
  }>()
);
export const UpdateUserInfoSuccessAction = createAction(
  '[Profile Page] Update User Info Success',
  props<{
    payload: IUserInfo;
  }>()
);
export const UpdateUserInfoFailureAction = createAction(
  '[Profile Page] Update User Info Failure',
  props<{
    payload: string;
  }>()
);

export const TryUpdatePasswordAction = createAction(
  '[Profile Page] Try Update Password',
  props<{
    payload: IUserPwd;
  }>()
);
export const UpdatePasswordSuccessAction = createAction(
  '[Profile Page] Update Password Success',
  props<{
    payload: IUserInfo;
  }>()
);
export const UpdatePasswordFailureAction = createAction(
  '[Profile Page] Update Password Failure',
  props<{
    payload: string;
  }>()
);