import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectsAddRoutingModule } from './projects-add-routing.module';
import { ProjectsAddComponent } from './projects-add.component';
import { VisitorService } from '../visitor.service';  

@NgModule({
  declarations: [
    ProjectsAddComponent
  ],
  imports: [
    CommonModule,
    ProjectsAddRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    VisitorService  
  ]
})
export class ProjectsAddModule { }
