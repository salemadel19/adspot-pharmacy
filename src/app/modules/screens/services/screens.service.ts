import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';
import {
  ICurrentDiffusions,
  IFolderCreation,
  IRegion,
  IScreenFolder,
  ITvsStatus,
  ITvRegion,
} from '../../../core/models/typings.model';

@Injectable({
  providedIn: 'root',
})
export class ScreensService {
  constructor(private apiService: ApiService) {}
  public fetchScreensRegions() {
    return this.apiService.get<IRegion[]>('/tvs/regions');
  }
  public fetchScreensByRegion(region: string) {
    return this.apiService.get<ITvRegion[]>(`/tvs/region?region=${region}`);
  }
  public fetchScreens(client_id: string) {
    return this.apiService.get<ITvsStatus>(
      `/tvs/status?client_id=${client_id}`
    );
  }
  public createScreenFolder(folderData: IFolderCreation) {
    const folder = {
      folder_title: folderData.folder_title,
      folder_description: folderData.folder_description,
    };
    return this.apiService.post<IScreenFolder[]>(
      `/tvs/folder/create?client_id=${folderData.client_id}`,
      folder
    );
  }
  public fetchScreenFolders(client_id: string) {
    return this.apiService.get<IScreenFolder[]>(
      `/tvs/folder/all?client_id=${client_id}`
    );
  }
  public fetchScreenFolder(client_id: string, folder_id: string) {
    return this.apiService.get<IScreenFolder[]>(
      `/tvs/folder?client_id=${client_id}&folder_id=${folder_id}`
    );
  }
  public updateScreenFolder(folder: IScreenFolder) {
    return this.apiService.put<IScreenFolder[]>(
      `/tvs/folder/update?client_id=${folder.client_id}&folder_id=${folder.folder_id}`,
      folder
    );
  }
  public deleteScreenFolder(folder_id: string) {
    return this.apiService.delete<IScreenFolder[]>(
      `/tvs/folder/delete?folder_id=${folder_id}`
    );
  }
  public fetchTvsCurrentDiffusion(tv_id: string) {
    return this.apiService.get<ICurrentDiffusions[]>(
      `/tvs/currentdiffusion?tv_id=${tv_id}`
    );
  }
}
