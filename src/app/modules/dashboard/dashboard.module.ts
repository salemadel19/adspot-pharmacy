import { NgModule } from '@angular/core';
import { SharedModule } from 'src/shared/shared.module';

import { EffectsModule } from '@ngrx/effects';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardDetailsComponent } from './dashboard-details/dashboard-details.component';
import { DashboardStatisticsComponent } from './dashboard-statistics/dashboard-statistics.component';
import { DashboardEffects } from './store/dashboard.effects';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardDetailsComponent,
    DashboardStatisticsComponent,
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    EffectsModule.forFeature([DashboardEffects]),
  ],
})
export class DashboardModule {}
