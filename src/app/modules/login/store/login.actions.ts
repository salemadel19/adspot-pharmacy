import {
  props,
  createActionGroup,
  emptyProps,
  createAction,
} from '@ngrx/store';
import {
  ILoggedUser,
  ILoginCredentials,
  IClientEmail
} from 'src/app/core/models/typings.model';

export const TryLoginUserAction = createAction(
  '[Login Page] Try Login user',
  props<{
    payload: ILoginCredentials;
  }>()
);
export const LoginSuccessAction = createAction(
  '[Login Page] Login Success',
  props<{
    payload: ILoggedUser;
  }>()
);
export const LoginFailureAction = createAction(
  '[Login Page] Login Failure',
  props<{
    payload: string;
  }>()
);
export const RouteIfAlreadyLoggedAction = createAction(
  '[Login Page] [UI] check If User is logged',
  props<{
    payload: string;
  }>()
);

export const TokenExistsAction = createAction(
  '[Login Page] Token Exists',
  props<{
    payload: ILoggedUser;
  }>()
);
export const TokenDoesntExistAction = createAction(
  '[Login Page] Token Doesn"t Exist'
);
export const logOutAction = createAction('[Login Page] Logout user');
export const UpdateClientNameAction = createAction(
  '[Login Page] Update Client Name',
  props<{ clientName: string }>()
);
export const TryResetPasswordAction = createAction(
  '[Login Page] Try Reset Password',
  props<{
    payload: IClientEmail;
  }>()
);
export const ResetPasswordSuccessAction = createAction(
  '[Login Page] Reset Password Success',
  emptyProps
);
export const ResetPasswordFailureAction = createAction(
  '[Login Page] Reset Password Failure',
  props<{
    payload: string;
  }>()
);