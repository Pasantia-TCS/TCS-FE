import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetsRoutingModule } from './assets-routing.module';
import { AssetsComponent } from './assets.component';


@NgModule({
  declarations: [
    AssetsComponent
  ],
  imports: [
    CommonModule,
    AssetsRoutingModule
  ]
})
export class AssetsModule { }
