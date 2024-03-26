import { Action, createReducer, on } from '@ngrx/store';
import { IProfilePageState } from '../../../core/models/store-typings.model';
import {
  LoadUserInfoAction,
  LoadUserInfoFailureAction,
  LoadUserInfoSuceessAction,
  TryUpdateUserInfoAction,
  UpdateUserInfoFailureAction,
  UpdateUserInfoSuccessAction,

} from './profile.actions';
export const userInfoInitialState: IProfilePageState = {
  errorMessage: '',
  isUserInfoLoading: false,
  userInfo:{
    infos: {
      client_name:'',
    client_phone:'',
    client_email:''
    },
    contracts: [],
    invoices: [],
    screensCount: '',
    maxBudget: '',
    totalScreens:''
  }
};

const profilePageReducer = createReducer(
    userInfoInitialState,
  on(LoadUserInfoAction, (state) => ({
    ...state,
    isUserInfoLoading: true,
  })),
  on(LoadUserInfoSuceessAction, (state, { payload }) => ({
    ...state,
    userInfo: payload,
    isUserInfoLoading: false,
  })),
  on(LoadUserInfoFailureAction, (state, { payload }) => ({
    ...state,
    isUserInfoLoading: false,
    errorMessage: payload,
  })),
  on(TryUpdateUserInfoAction, (state) => ({
    ...state,
    isUserInfoLoading: true,
    errorMessage: '',
  })),
  on(UpdateUserInfoSuccessAction, (state, { payload }) => ({
    ...state,
    isUserInfoLoading: false,
    ...state.userInfo,
    infos:{
      client_name:payload.client_name,
      client_phone:payload.client_phone,
      client_email:payload.client_email
    },
  })),
  on(UpdateUserInfoFailureAction, (state, { payload }) => ({
    ...state,
    isUserInfoLoading: false,
    errorMessage: payload,
  })),
  
);

export function profilePageRootReducer(
  state: IProfilePageState | undefined,
  action: Action
): IProfilePageState {
  return profilePageReducer(state, action);
}
