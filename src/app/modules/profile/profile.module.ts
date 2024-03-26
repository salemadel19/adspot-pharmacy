import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileEffects } from './store/profile.effects';


@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    EffectsModule.forFeature([ProfileEffects]),

  ]
})
export class ProfileModule { }
