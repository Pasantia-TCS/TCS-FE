import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { SharedModule } from '../shared/shared.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderComponent } from './components/header/header.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AssetsComponent } from './components/assets/assets.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { FormsComponent } from './components/forms/forms.component';
import { SelectionComponent } from './components/selection/selection.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableBasic } from './components/table/table.component';
import { TableAsignacion } from './components/tableAsignacion/tableAsignacion.component';
import { MatButtonModule } from '@angular/material/button';
import { NewAssetComponent } from './components/new-asset/new-asset.component';
import { SearchComponent } from './components/search/search.component';
import { NewTemplateComponent } from './components/new-template/new-template.component';
import { CardComponent } from './components/card/card.component';
import { NewProjectComponent } from './components/new-project/new-project/new-project.component';
import { DeliverModalComponent } from './components/deliver-modal/deliver-modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    CustomButtonComponent,
    DashboardComponent,
    AssetsComponent,
    TasksComponent,
    FormsComponent,
    SelectionComponent,
    ProfileComponent,
    TableBasic,
    TableAsignacion,
    NewAssetComponent,
    SearchComponent,
    NewTemplateComponent,
    CardComponent,
    NewProjectComponent,
    DeliverModalComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    SharedModule,
    MatSidenavModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  exports: [
    CustomButtonComponent,
    HeaderComponent
  ]
})
export class ProtectedModule { }
