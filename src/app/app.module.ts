import { LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from 'src/shared/shared.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './modules/sidebar/sidebar.component';
import { LoginModule } from './modules/login/login.module';
import { HttpTokenInterceptor } from './core/interceptor/http.interceptor';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { reducers } from '.';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './modules/login/store/login.effects';
import { DialogService } from 'primeng/dynamicdialog';

import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { ScreensEffects } from './modules/screens/store/screens.effects';
import { ScreensModule } from './modules/screens/screens.module';

import { DashboardModule } from './modules/dashboard/dashboard.module';
import { DashboardEffects } from './modules/dashboard/store/dashboard.effects';
import {
  CalendarModule as AngularCalendarModule,
  DateAdapter,
} from 'angular-calendar';

import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { ProfileModule } from './modules/profile/profile.module';
import { FoldersModalComponent } from '../shared/folders-modal/folders-modal.component';
import { FoldarCreationModalComponent } from '../shared/foldar-creation-modal/foldar-creation-modal.component';

registerLocaleData(localeFr, 'fr');
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    FoldarCreationModalComponent,
    FoldersModalComponent,
  ],
  imports: [
    FormsModule,
    LoginModule,
    ScreensModule,
    DashboardModule,
    BrowserModule,
    ProfileModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularCalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgbModalModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: { strictStateImmutability: true },
    }),
    EffectsModule.forRoot([LoginEffects, ScreensEffects, DashboardEffects]),
    StoreDevtoolsModule.instrument({
      name: 'Adpsot-app',
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true,
    },
    MessageService,
    DialogService,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'fr-FR' },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
