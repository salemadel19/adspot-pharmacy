import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { LoginFacade } from './services/login-facade.service';
import { ForgetPasswordModalComponent } from '../login/forget-password-modal/forget-password-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public isLoading$ = this.loginFacade.isLoading$;
  public isResetLoading$ = this.loginFacade.isResetLoading$;
  constructor(private _fb: FormBuilder, private loginFacade: LoginFacade,private dialogService: DialogService) {}
  public loginForm = this._fb.group({
    username: this._fb.control('', [Validators.required]),
    password: this._fb.control('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  ngOnInit(): void {
    this.loginFacade.checkAlreadyLoggedIn();
  }

  login() {
    if (this.loginForm.valid) {
      this.loginFacade.tryLoginUser({
        username: this.userNameControl.value.trim(),
        password: this.passwordControl.value.trim(),
      });
    }
  }

  public get userNameControl() {
    return this.loginForm.get('username') as AbstractControl;
  }
  public get passwordControl() {
    return this.loginForm.get('password') as AbstractControl;
  }
  public openPasswordDialog() {
    this.dialogService.open(ForgetPasswordModalComponent, {
      header: 'Mot de passe oublié',
      width: '30%',
      baseZIndex: 10000,
      closeOnEscape: true,
      dismissableMask: true,
      styleClass: 'forget-password',
    });
  }
}
