import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AssetsComponent } from './components/assets/assets.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { FormsComponent } from './components/forms/forms.component';
import { SelectionComponent } from './components/selection/selection.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TeamsComponent } from './components/teams/teams.component';
import { ValidateTokenGuard } from '../auth/guards/validate-token.guard';
import { TemplateComponent } from './components/template/template.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SelectionComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
          {
            path: 'profile',
            component: ProfileComponent
          },
          {
            path: 'assets',
            component: AssetsComponent
          },
          {
            path: 'tasks',
            component: TasksComponent
          },
          {
            path: 'forms',
            component: FormsComponent,
          },
          {
            path: 'teams',
            component: TeamsComponent
          },
          {
            path: 'new-template',
            component: TemplateComponent
          }
        ]
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
