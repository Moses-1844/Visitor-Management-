import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectsAddRoutingModule } from './projects-add-routing.module';
import { ProjectsAddComponent } from './projects-add.component';


@NgModule({
  declarations: [
    ProjectsAddComponent
  ],
  imports: [
    CommonModule,
    ProjectsAddRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProjectsAddModule { }
