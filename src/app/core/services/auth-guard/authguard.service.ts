import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../models/store-typings.model';
import { loginQuery } from '../../../modules/login/store/login.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthguardService implements CanActivate {
  constructor(private router: Router, private store: Store<AppState>) {}
  public logedUser: boolean = false;
  canActivate(): boolean {
    this.store
      .pipe(select(loginQuery.userLogedIn))
      .subscribe((user) => (this.logedUser = user));
    if (this.logedUser) {
      return true;
    }
    this.router.navigate(['/login'], { replaceUrl: true });
    return false;
  }
}
