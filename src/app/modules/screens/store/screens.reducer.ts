import { Action, createReducer, on } from '@ngrx/store';
import { IScreensPageState } from '../../../core/models/store-typings.model';
import {
  AddScreenToFolderAction,
  CreateScreensFolderFailureAction,
  CreateScreensFolderSuccessAction,
  DeleteFolderFailureAction,
  DeleteFolderSuccessAction,
  LoadScreenFolderFailureAction,
  LoadScreenFolderSuccessAction,
  LoadScreenListAction,
  LoadScreenListFailureAction,
  LoadScreenListSuceessAction,
  LoadScreensCurrentDiffusionFailureAction,
  LoadScreensCurrentDiffusionSuccessAction,
  LoadScreensFoldersAction,
  LoadScreenFoldersFailureAction,
  LoadScreenFoldersSuccessAction,
  OnAcceptDeleteFolderAction,
  OnFolderSelectionAction,
  OnScreenSelection,
  OnScreensFolderCreationAction,
  UpdateScreenFolderFailureAction,
  UpdateScreenFolderSuccessAction,
  ClearScreensCurrentDiffusionAction,
} from './screens.actions';

export const screensInitialState: IScreensPageState = {
  errorMessage: '',
  isScreenListLoading: false,
  screens: {
    tvs: [],
    total_tvs: 0,
  },
  screenDetails: {
    contact_address: '',
    contact_age: '',
    contact_avatar_url: '',
    contact_city: '',
    contact_firstname: '',
    contact_id: '',
    contact_lastname: '',
    contact_location: {
      x: '',
      y: '',
    },
    contact_region: '',
    contact_wilaya: '',
    created_at: '',
    created_by: '',
    isLoading: false,
    location_existence: false,
    modified_at: '',
    modified_by: '',
    tv_id: '',
    tv_internet_connection: '',
    tv_last_connection: '',
    tv_last_error: '',
    tv_last_error_description: '',
    tv_position: '',
    tv_status: '',
    tv_type: '',
    tags: [],
    tv_login_id: '',
    tv_modem_phone: '',
    tv_serial_number: '',
    tv_size: '',
    isSelected: false,
    installed: false,
  },
  screensFolders: [],

  isFoldersLoading: false,
  folderCreationData: {
    client_id: '',
    folder_title: '',
    folder_description: '',
  },
  createdFolder: [],
  folders: [],
  folder: [],
  currentScreensDiffusion: [],
};

const screensPageReducer = createReducer(
  screensInitialState,
  on(LoadScreenListAction, (state) => ({
    ...state,
    isScreenListLoading: true,
  })),
  on(LoadScreenListSuceessAction, (state, { payload }) => ({
    ...state,
    screens: payload,
    isScreenListLoading: false,
  })),
  on(LoadScreenListFailureAction, (state, { payload }) => ({
    ...state,
    isScreenListLoading: false,
    errorMessage: payload,
  })),
  on(OnScreenSelection, (state, { payload }) => ({
    ...state,
    screenDetails: payload.screen,
    screensFolders: payload.folders,
  })),
  on(ClearScreensCurrentDiffusionAction, state => ({
    ...state,
    currentScreensDiffusion: [], 
  })),
  on(LoadScreensCurrentDiffusionSuccessAction, (state, { payload }) => ({
    ...state,
    isScreenListLoading: false,
    currentScreensDiffusion: payload,
  })),
  on(LoadScreensCurrentDiffusionFailureAction, (state, { payload }) => ({
    ...state,
    isScreenListLoading: false,
    errorMessage: payload,
  })),
  on(OnScreensFolderCreationAction, (state, { payload }) => ({
    ...state,
    isFoldersLoading: true,
    folderCreationData: payload,
  })),
  on(CreateScreensFolderSuccessAction, (state, { payload }) => ({
    ...state,
    createdFolder: payload,
    isFoldersLoading: false,
  })),
  on(CreateScreensFolderFailureAction, (state, { payload }) => ({
    ...state,
    errorMessage: payload,
    isFoldersLoading: false,
  })),
  on(LoadScreensFoldersAction, (state) => ({
    ...state,
    isFoldersLoading: true,
  })),
  on(LoadScreenFoldersSuccessAction, (state, { payload }) => ({
    ...state,
    folders: payload,
    isFoldersLoading: false,
  })),
  on(LoadScreenFoldersFailureAction, (state, { payload }) => ({
    ...state,
    isFoldersLoading: false,
    errorMessage: payload,
  })),
  on(AddScreenToFolderAction, (state) => ({
    ...state,
    isFoldersLoading: true,
  })),

  on(UpdateScreenFolderSuccessAction, (state, { payload }) => ({
    ...state,
    isFoldersLoading: false,
  })),
  on(UpdateScreenFolderFailureAction, (state, { payload }) => ({
    ...state,
    isFoldersLoading: false,
    errorMessage: payload,
  })),

  on(OnFolderSelectionAction, (state) => ({
    ...state,
  })),

  on(LoadScreenFolderSuccessAction, (state, { payload }) => ({
    ...state,
    folder: payload,
  })),
  on(LoadScreenFolderFailureAction, (state, { payload }) => ({
    ...state,
    errorMessage: payload,
  })),
  on(OnAcceptDeleteFolderAction, (state) => ({
    ...state,
    isFoldersLoading: true,
  })),

  on(DeleteFolderSuccessAction, (state, { payload }) => ({
    ...state,
    isFoldersLoading: false,
  })),
  on(DeleteFolderFailureAction, (state, { payload }) => ({
    ...state,
    isFoldersLoading: false,
    errorMessage: payload,
  }))
);

export function screensPageRootReducer(
  state: IScreensPageState | undefined,
  action: Action
): IScreensPageState {
  return screensPageReducer(state, action);
}
