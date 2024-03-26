import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from 'src/shared/shared.module';
import { LoginComponent } from './login.component';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './store/login.effects';
import { ForgetPasswordModalComponent } from './forget-password-modal/forget-password-modal.component';

@NgModule({
  declarations: [LoginComponent, ForgetPasswordModalComponent],
  imports: [
    LoginRoutingModule,
    SharedModule,
    EffectsModule.forFeature([LoginEffects]),
  ],
})
export class LoginModule {}
