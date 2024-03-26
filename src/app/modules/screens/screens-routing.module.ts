import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScreensComponent } from './screens.component';
import { AuthguardService } from '../../core/services/auth-guard/authguard.service';

const routes: Routes = [
  {
    path: 'screens',
    component: ScreensComponent,
    canActivate: [AuthguardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreensRoutingModule {}
