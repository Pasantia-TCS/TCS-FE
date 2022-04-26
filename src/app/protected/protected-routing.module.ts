import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetsComponent } from './pages/assets/assets.component';
import { SelectionComponent } from './pages/selection/selection.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SelectionComponent
      },
      {
        path: 'assets',
        component: AssetsComponent
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
