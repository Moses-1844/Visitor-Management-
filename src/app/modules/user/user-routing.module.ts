import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { ProjectDetailComponent } from '../common/pages/user-details/project-detail.component';

const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'project-details/:id', component: ProjectDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }