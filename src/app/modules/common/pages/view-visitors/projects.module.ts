import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 


@NgModule({
  declarations: [
    ProjectsComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule
  ]
})
export class ProjectsModule { }
