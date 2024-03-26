import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';
import { IUserInfo,IProfileInfo, IUserPwd } from '../../../core/models/typings.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private apiService: ApiService) {}

  public fetchInfos(client_id: any) {
    return this.apiService.get<IProfileInfo>(
      '/client/infos?client_id=' + client_id
    );
  }

  public tryUpdateInfo(
    client_id: any,
    { client_name,
      client_phone,
      client_email }: IUserInfo
  ): Observable<IUserInfo> {
    return this.apiService.put<IUserInfo>(
      '/client/infos/update?client_id=' + client_id,
      {client_name,
        client_phone,
        client_email}
    );
  }

  public updatePassword(
    client_id: any,
    { old_password,
      new_password }: IUserPwd
  ): Observable<IUserInfo> {
    return this.apiService.put<IUserInfo>(
      '/client/password/update?client_id=' + client_id,
      {old_password,
        new_password}
    );
  }
}
