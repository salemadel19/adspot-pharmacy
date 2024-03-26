import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoggedUser, ILoginCredentials } from '../../models/typings.model';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private apiService: ApiService) {}

  public registerUser({
    username,
    password,
  }: ILoginCredentials): Observable<ILoggedUser> {
    return this.apiService.post<ILoggedUser>('/login', {
      username,
      password,
    });
  }
  public loggedIn() {
    return !!localStorage.getItem('token');
  }
  public getToken() {
    return localStorage.getItem('token');
  }
}
