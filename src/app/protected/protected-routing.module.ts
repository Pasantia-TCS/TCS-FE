import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { AssetsComponent } from './modules/assets/assets.component';
import { FormsComponent } from './modules/forms/forms.component';
import { TasksComponent } from './modules/tasks/tasks.component';
// import { AssetsComponent } from './pages/assets/assets.component';

import { SelectionComponent } from './pages/selection/selection.component';

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
        component: SidebarComponent,
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
