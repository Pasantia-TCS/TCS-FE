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
import { CardComponent } from './components/card/card.component';
import { DarBajaComponent } from './components/dar-baja/dar-baja.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DeliverModalComponent } from './components/deliver-modal/deliver-modal.component';
import { EditAboutComponent } from './components/edit-about/edit-about.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditSkillsComponent } from './components/edit-skills/edit-skills.component';
import { FilterComponent } from './components/filter/filter.component';
import { FormsComponent } from './components/forms/forms.component';
import { HeaderComponent } from './components/header/header.component';
import { MatTableComponent } from './components/mat-table/mat-table.component';
import { NewAssetComponent } from './components/new-asset/new-asset.component';
import { NewAssignmentComponent } from './components/new-assignment/new-assignment.component';
import { NewProjectComponent } from './components/new-project/new-project/new-project.component';
import { NewTeamComponent } from './components/new-team/new-team.component';
import { NewTemplateComponent } from './components/new-template/new-template.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SearchComponent } from './components/search/search.component';
import { SelectionComponent } from './components/selection/selection.component';
import { SettingsComponent } from './components/settings/settings.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { SubtitleComponent } from './components/subtitle/subtitle.component';
import { TableBasic } from './components/table/table.component';
import { TableAsignacion } from './components/tableAsignacion/tableAsignacion.component';
import { TableEquiposComponent } from './components/tableEquipos/tableEquipos.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TeamsComponent } from './components/teams/teams.component';
import { TemplateComponent } from './components/template/template.component';
import { ProtectedRoutingModule } from './protected-routing.module';

@NgModule({
  declarations: [
    HeaderComponent,
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
    DeliverModalComponent,
    TeamsComponent,
    TableEquiposComponent,
    NewTeamComponent,
    NewAssignmentComponent,
    TemplateComponent,
    StarRatingComponent,
    EditProfileComponent,
    EditSkillsComponent,
    DarBajaComponent,
    EditAboutComponent,
    SettingsComponent,
    ReportsComponent,
    MatTableComponent,
    FilterComponent,
    SubtitleComponent,
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
