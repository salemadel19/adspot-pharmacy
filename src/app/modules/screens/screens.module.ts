import { NgModule } from '@angular/core';
import { SharedModule } from 'src/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { ScreensComponent } from './screens.component';
import { ScreensEffects } from './store/screens.effects';
import { ScreensRoutingModule } from './screens-routing.module';
import { ScreensListComponent } from './screens-list/screens-list.component';
import { ScreensDetailsComponent } from './screens-details/screens-details.component';
import { ConnectScreenModalComponent } from './connect-screen-modal/connect-screen-modal.component';

@NgModule({
  declarations: [
    ScreensComponent,
    ScreensListComponent,
    ScreensDetailsComponent,
    ConnectScreenModalComponent,
  ],
  imports: [
    ScreensRoutingModule,
    SharedModule,
    EffectsModule.forFeature([ScreensEffects]),
  ],
})
export class ScreensModule {}
