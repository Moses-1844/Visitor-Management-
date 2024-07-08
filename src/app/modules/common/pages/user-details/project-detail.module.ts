import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectDetailRoutingModule } from './project-detail-routing.module';
import { ProjectDetailComponent } from './project-detail.component';
import { UserService } from './user.service';
import { ReactiveFormsModule } from '@angular/forms';
import {AbstractControl, ValidatorFn} from '@angular/forms';


@NgModule({
  declarations: [
    ProjectDetailComponent
  ],
  imports: [
    CommonModule,
    ProjectDetailRoutingModule,
    ReactiveFormsModule,
  ]
  //providers: [UserService]
})
export class ProjectDetailModule { }
