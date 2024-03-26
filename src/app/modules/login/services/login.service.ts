import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../core/services/api/api.service';
import {
  IClientEmail,
  ILoggedUser,
  ILoginCredentials,
} from '../../../core/models/typings.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private apiService: ApiService) {}

  public tryLogin({
    username,
    password,
  }: ILoginCredentials): Observable<ILoggedUser> {
    
    return this.apiService.post<ILoggedUser>('/login', {
      username,
      password,
    });
  }
  public tryResetPassword({
    client_email,
  }: IClientEmail): Observable<IClientEmail> {
    
    return this.apiService.post<IClientEmail>('/client/password/reset', {
      client_email,
    });
  }
}
