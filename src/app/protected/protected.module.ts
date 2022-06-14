import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '../shared/shared.module';
import { AssetsComponent } from './components/assets/assets.component';
import { DarBajaComponent } from './components/dar-baja/dar-baja.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DeliverModalComponent } from './components/deliver-modal/deliver-modal.component';
import { EditAboutComponent } from './components/edit-about/edit-about.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditSkillsComponent } from './components/edit-skills/edit-skills.component';
import { FilterComponent } from './components/filter/filter.component';
import { HeaderComponent } from './components/header/header.component';
import { MatTableComponent } from './components/mat-table/mat-table.component';
import { NewAssetComponent } from './components/new-asset/new-asset.component';
import { NewAssignmentComponent } from './components/new-assignment/new-assignment.component';
import { NewProjectComponent } from './components/new-project/new-project/new-project.component';
import { NewTeamComponent } from './components/new-team/new-team.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SelectionComponent } from './components/selection/selection.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SubtitleComponent } from './components/subtitle/subtitle.component';
import { TableBasic } from './components/table/table.component';
import { TableEquiposComponent } from './components/tableEquipos/tableEquipos.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TeamsComponent } from './components/teams/teams.component';
import { ProtectedRoutingModule } from './protected-routing.module';
import { AddCatalogComponent } from './components/add-catalog/add-catalog.component';
import { AddCatalogBuildingComponent } from './components/add-catalog-building/add-catalog-building.component';
import { EditFuncSkillsComponent } from './components/edit-func-skills/edit-func-skills.component';
import { EditAppsComponent } from './components/edit-apps/edit-apps.component';
import { MatIconTableComponent } from './components/mat-icon-table/mat-icon-table.component';

@NgModule({
  declarations: [
    HeaderComponent,
    DashboardComponent,
    AssetsComponent,
    TasksComponent,
    SelectionComponent,
    ProfileComponent,
    TableBasic,
    NewAssetComponent,
    NewProjectComponent,
    DeliverModalComponent,
    TeamsComponent,
    TableEquiposComponent,
    NewTeamComponent,
    NewAssignmentComponent,
    EditProfileComponent,
    EditSkillsComponent,
    DarBajaComponent,
    EditAboutComponent,
    SettingsComponent,
    ReportsComponent,
    MatTableComponent,
    FilterComponent,
    SubtitleComponent,
    AddCatalogComponent,
    AddCatalogBuildingComponent,
    EditFuncSkillsComponent,
    EditAppsComponent,
    MatIconTableComponent,
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    SharedModule,
    MatSidenavModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class ProtectedModule { }
