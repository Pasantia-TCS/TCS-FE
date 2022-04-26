import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { SelectionComponent } from './pages/selection/selection.component';
import { SharedModule } from '../shared/shared.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [
    SelectionComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    SharedModule,
    MatSidenavModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class ProtectedModule { }
