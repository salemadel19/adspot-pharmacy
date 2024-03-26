import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { AuthguardService } from '../../core/services/auth-guard/authguard.service';


const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthguardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
