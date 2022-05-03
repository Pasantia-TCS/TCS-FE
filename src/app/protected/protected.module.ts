import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
// import { SelectionComponent } from './pages/selection/selection.component';
import { SharedModule } from '../shared/shared.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AssetsComponent } from './components/assets/assets.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { FormsComponent } from './components/forms/forms.component';
import { SelectionComponent } from './components/selection/selection.component';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    CustomButtonComponent,
    DashboardComponent,
    AssetsComponent,
    TasksComponent,
    FormsComponent,
    SelectionComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    SharedModule,
    MatSidenavModule,
    MatIconModule,
    MatTooltipModule
  ], exports: [
    CustomButtonComponent,
    HeaderComponent
  ]
})
export class ProtectedModule { }
