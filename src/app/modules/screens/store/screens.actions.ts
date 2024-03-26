import { createAction, props } from '@ngrx/store';
import {
  ICurrentDiffusions,
  IFolderCreation,
  IScreenFolder,
  ITvsStatus,
  ITvs,
} from '../../../core/models/typings.model';

export const LoadScreenListAction = createAction(
  '[Screen Page] Load Screen List'
);
export const LoadScreenListSuceessAction = createAction(
  '[Screen Page] Load Screen List Success',
  props<{
    payload: ITvsStatus;
  }>()
);
export const LoadScreenListFailureAction = createAction(
  '[Screen Page] Load Screen List Failure',
  props<{
    payload: string;
  }>()
);
export const OnScreenSelection = createAction(
  '[Screen Page] Get Selected Screen Details ',
  props<{
    payload: { screen: ITvs; folders: IScreenFolder[] };
  }>()
);
export const ClearScreensCurrentDiffusionAction = createAction(
  '[Screen Page] Clear Current Diffusion'
);
export const LoadScreensCurrentDiffusionSuccessAction = createAction(
  '[Screen Page] Get Screens Current Diffusion Success',
  props<{
    payload: ICurrentDiffusions[];
  }>()
);
export const LoadScreensCurrentDiffusionFailureAction = createAction(
  '[Screen Page]Get Screens Current Diffusion Failure',
  props<{
    payload: string;
  }>()
);

export const OnScreensFolderCreationAction = createAction(
  '[Screen Page] set Screens Folder"s Creation Data',
  props<{
    payload: IFolderCreation;
  }>()
);
export const CreateScreensFolderSuccessAction = createAction(
  '[Screen Page] Create Screens Folder Success',
  props<{
    payload: IScreenFolder[];
  }>()
);
export const CreateScreensFolderFailureAction = createAction(
  '[Screen Page] Create Screens Folder Failure',
  props<{
    payload: string;
  }>()
);
export const LoadScreensFoldersAction = createAction(
  '[Screen Page] Load Screens Folders List'
);
export const LoadScreenFoldersSuccessAction = createAction(
  '[Screen Page] Load Screens Folders Success',
  props<{
    payload: IScreenFolder[];
  }>()
);
export const LoadScreenFoldersFailureAction = createAction(
  '[Screen Page] Load Screen Folders Failure',
  props<{
    payload: string;
  }>()
);

export const AddScreenToFolderAction = createAction(
  '[Screen Page] Add a Screen to a Folder',
  props<{
    payload: IScreenFolder;
  }>()
);
export const UpdateScreenFolderSuccessAction = createAction(
  '[Screen Page] Update folder with new Screen',
  props<{
    payload: IScreenFolder[];
  }>()
);
export const UpdateScreenFolderFailureAction = createAction(
  '[Screen Page] Update Screen Folder Failure',
  props<{
    payload: string;
  }>()
);

export const OnFolderSelectionAction = createAction(
  '[Screen Page] Select Screens Folder',
  props<{
    payload: { client_id: string; folder_id: string };
  }>()
);
export const LoadScreenFolderSuccessAction = createAction(
  '[Screen Page] Get Folder Screens  Success ',
  props<{
    payload: IScreenFolder[];
  }>()
);
export const LoadScreenFolderFailureAction = createAction(
  '[Screen Page] get Folder Screens Failure  ',
  props<{
    payload: string;
  }>()
);
export const OnAcceptDeleteFolderAction = createAction(
  '[Screen Page] confirm delete folder',
  props<{
    payload: { folder_id: string; client_id: string };
  }>()
);
export const DeleteFolderSuccessAction = createAction(
  '[Screen Page] Delete Folder  Success ',
  props<{
    payload: IScreenFolder[];
  }>()
);
export const DeleteFolderFailureAction = createAction(
  '[Screen Page] Delete Folder Failure  ',
  props<{
    payload: string;
  }>()
);
