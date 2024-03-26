import {
  IDashboard,
  IDiffusionTotalStatus,
  IFolderCreation,
  ITvsStatus,
  ITvs,
  IProfileInfo,
  IScreenFolder,
  INotification,
  ICurrentDiffusions,
} from './typings.model';

export interface AppState {
  sidebar: ISidebarPageState;
  loginPage: ILoginPageState;
  screensPage: IScreensPageState;
  dashboardPage: IDashboardPageState;
  profilePage: IProfilePageState;
}
export interface ISidebarPageState {
  route: string;
  activeItme: string;
}

export interface ILoginPageState {
  isAuthenticated: boolean;
  user: {
    client_id: string;
    clientName: string;
    clientID: string;
    token: string;
  };
  errorMessage: string | null;
  isLoading: boolean;
  isResetLoading: boolean;
}

export interface IScreensPageState {
  screens: ITvsStatus;
  isScreenListLoading: boolean;
  screenDetails: ITvs;
  errorMessage: string | null;
  screensFolders: IScreenFolder[];
  isFoldersLoading: boolean;
  folderCreationData: IFolderCreation;
  createdFolder: IScreenFolder[];
  folders: IScreenFolder[];
  folder: IScreenFolder[];
  currentScreensDiffusion: ICurrentDiffusions[];
}

export interface IDashboardPageState {
  isDashboardLoading: boolean;
  totalStatus: IDiffusionTotalStatus;
  dashboard: IDashboard;
  errorMessage: string | null;
  notifications: INotification[];
}

export interface IProfilePageState {
  userInfo: IProfileInfo;
  isUserInfoLoading: boolean;
  errorMessage: string | null;
}
