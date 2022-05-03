import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetsRoutingModule } from './assets-routing.module';
import { AssetsComponent } from './assets.component';
import { HeaderComponent } from '../../components/header/header.component';


@NgModule({
  declarations: [
    AssetsComponent
  ],
  imports: [
    CommonModule,
    AssetsRoutingModule,
    HeaderComponent
  ]
})
export class AssetsModule { }
