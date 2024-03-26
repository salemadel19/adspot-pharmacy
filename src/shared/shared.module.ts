import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgSharedModule } from './primeng.module';


const modules = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  PrimeNgSharedModule,
];
@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules ],
})
export class SharedModule {}
 