import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { TasksService } from './services/tasks.service';
import { ButtonComponent } from './components/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { CustomTableComponent } from './components/custom-table/custom-table.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ButtonComponent,
    CustomTableComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    ButtonComponent,
    CustomTableComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [UserService, TasksService]
    }
  }
}
