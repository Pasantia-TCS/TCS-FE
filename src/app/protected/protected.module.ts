import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { SelectionComponent } from './pages/selection/selection.component';
import { AssetsComponent } from './pages/assets/assets.component';


@NgModule({
  declarations: [
    SelectionComponent,
    AssetsComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule
  ]
})
export class ProtectedModule { }
