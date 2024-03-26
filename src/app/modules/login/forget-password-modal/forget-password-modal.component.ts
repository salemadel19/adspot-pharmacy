import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginFacade } from '../services/login-facade.service';


@Component({
  selector: 'app-forget-password-modal',
  templateUrl: './forget-password-modal.component.html',
  styleUrls: ['./forget-password-modal.component.scss']
})
export class ForgetPasswordModalComponent {
  public fpwdForm: FormGroup;
  constructor(private formBuilder: FormBuilder, public ref: DynamicDialogRef, private loginFacade: LoginFacade) {
    this.fpwdForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
    });
  }
  public get emailControl() {
    return this.fpwdForm.get('email') as AbstractControl;
  }
  public submitEmail() {
    if (this.fpwdForm.valid) {
      this.loginFacade.tryResetPassword({
        client_email: this.emailControl.value.trim(),
      });
    }
    this.fpwdForm.reset();
    this.ref.close();
  }
  public closePasswordModal() {
    this.fpwdForm.reset();
    this.ref.close();
  }
}
