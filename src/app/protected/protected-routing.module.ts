import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AssetsComponent } from './components/assets/assets.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { FormsComponent } from './components/forms/forms.component';
import { SelectionComponent } from './components/selection/selection.component';

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
            path: 'assets',
            component: AssetsComponent
          },
          {
            path: 'tasks',
            component: TasksComponent
          },
          {
            path: 'forms',
            component: FormsComponent
          },
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
