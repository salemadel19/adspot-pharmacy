import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { AccordionModule } from 'primeng/accordion';
import { DividerModule } from 'primeng/divider';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { MenuModule } from 'primeng/menu';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { StepsModule } from 'primeng/steps';
import { TabViewModule } from 'primeng/tabview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { DragDropModule } from 'primeng/dragdrop';
import { MultiSelectModule } from 'primeng/multiselect';

const modules = [
  ButtonModule,
  DialogModule,
  InputTextModule,
  PasswordModule,
  DropdownModule,
  TagModule,
  AccordionModule,
  DividerModule,
  ScrollPanelModule,
  ToastModule,
  MessagesModule,
  MessageModule,
  ProgressSpinnerModule,
  NgxDropzoneModule,
  InputTextareaModule,
  AvatarModule,
  AvatarGroupModule,
  ToggleButtonModule,
  MenuModule,
  DynamicDialogModule,
  CalendarModule,
  ChartModule,
  StepsModule,
  TabViewModule,
  ConfirmDialogModule,
  TableModule,
  DragDropModule,
  MultiSelectModule,
];
@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class PrimeNgSharedModule {}
