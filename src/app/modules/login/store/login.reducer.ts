import { Action, createReducer, on } from '@ngrx/store';
import { ILoginPageState } from '../../../core/models/store-typings.model';
import {
  LoginFailureAction,
  LoginSuccessAction,
  TokenDoesntExistAction,
  TokenExistsAction,
  TryLoginUserAction,
  logOutAction,
  UpdateClientNameAction,
  TryResetPasswordAction,
  ResetPasswordSuccessAction,
  ResetPasswordFailureAction
} from './login.actions';

export const loginInitialState: ILoginPageState = {
  isAuthenticated: false,
  user: {
    client_id:'',
    clientName: '',
    clientID: '',
    token: '',
  },
  errorMessage: null,
  isLoading: false,
  isResetLoading: false,
};

const loginPageReducer = createReducer(
  loginInitialState,
  on(TryLoginUserAction, (state) => ({
    ...state,
    isLoading: true,
    errorMessage: '',
  })),
  on(LoginSuccessAction, (state, { payload }) => ({
    ...state,
    isAuthenticated: true,
    isLoading: false,
    user: {
      client_id: payload.client_id,
      clientName: payload.clientName,
      clientID: payload.clientID,
      token: payload.accessToken,
    },
  })),
  on(LoginFailureAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    errorMessage: payload,
  })),

  on(TokenExistsAction, (state, { payload }) => ({
    ...state,
    isAuthenticated: true,
    user: {
      client_id: payload.client_id,
      clientName: payload.clientName,
      clientID: payload.clientID,
      token: payload.accessToken,
    },
  })),
  on(TokenDoesntExistAction, (state) => ({
    ...state,
    isAuthenticated: false,
  })),
  on(logOutAction, () => loginInitialState),
  on(UpdateClientNameAction, (state, { clientName }) => ({
    ...state,
    user: {
      ...state.user,
      clientName,
    },
  })),
  on(TryResetPasswordAction, (state) => ({
    ...state,
    isResetLoading: true,
  })),
  on(ResetPasswordSuccessAction, (state) => ({
    ...state,
    isResetLoading: false,
    
  })),
  on(ResetPasswordFailureAction, (state) => ({
    ...state,
    isResetLoading: false,
  })),
);

export function loginPageRootReducer(
  state: ILoginPageState | undefined,
  action: Action
): ILoginPageState {
  return loginPageReducer(state, action);
}
