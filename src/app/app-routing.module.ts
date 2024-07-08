import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './modules/auth/guards/auth.guard';
import { DefaultLayoutComponent } from './core/default-layout/default-layout.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { ResetPasswordComponent } from './modules/auth/reset-password/reset-password.component';
import { ReceptionistDashboardComponent } from './modules/receptionist-dashboard/receptionist-dashboard.component';
import { OwnerDashboardComponent } from './modules/owner-dashboard/owner-dashboard.component';
import { AdminProfileComponent } from './modules/common/pages/admin-profile/admin-profile.component';
import { AddDepartmentComponent } from './modules/common/pages/add-department/add-department.component';
import { ViewAppointmmentComponent } from './modules/common/pages/view-appointmment/view-appointmment.component';
import {ViewAllVisitorsComponent } from './modules/common/pages/view-allvisitors/view-allvisitors.component';
import { ViewAllappointmentComponent } from './modules/common/pages/view-allappointment/view-allappointment.component';
import { ViewAlldepartmentComponent } from './modules/common/pages/view-alldepartment/view-alldepartment.component';


const routes: Routes = [
   {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
   },
  {
    path: '',
    component: DefaultLayoutComponent,
    // canActivate: [authGuard],
    data: {
      title: 'Home'
    },
    children: [
      { path: 'users', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) },
       
      
       
      
       
     
      { path: 'invoice', loadChildren: () => import('./modules/common/pages/view-institutions/invoice.module').then(m => m.InvoiceModule) },
      { path: 'profile', loadChildren: () => import('./modules/common/pages/Add-Bank/profile.module').then(m => m.ProfileModule) },
        
      { path: 'projects', loadChildren: () => import('./modules/common/pages/view-visitors/projects.module').then(m => m.ProjectsModule) },
      { path: 'projects-add', loadChildren: () => import('./modules/common/pages/addVisitor/projects-add.module').then(m => m.ProjectsAddModule) },
      { path: 'project-edit', loadChildren: () => import('./modules/common/pages/visitors-details/project-edit.module').then(m => m.ProjectEditModule) },
      { path: 'project-detail', loadChildren: () => import('./modules/common/pages/user-details/project-detail.module').then(m => m.ProjectDetailModule) },
      { path: 'contacts', loadChildren: () => import('./modules/common/pages/chekin/contacts.module').then(m => m.ContactsModule) },
      { path: 'faq', loadChildren: () => import('./modules/common/pages/visitor-details/faq.module').then(m => m.FaqModule) },
      
      { path: 'contact-us', loadChildren: () => import('./modules/common/pages/Book-Appointment/contact-us.module').then(m => m.ContactUsModule) },
      {
        path: 'receptionist-dashboard',
         component: ReceptionistDashboardComponent,  
         data: { 
           expectedRole: 'receptionist' }
    },
    {
      path: 'owner-dashboard',
        component: OwnerDashboardComponent,
        data: { 
          expectedRole: 'admin' }
    },
    {path: 'add-department', 
    component: AddDepartmentComponent,
    data: {
      expectedRole: 'admin' 
    }
  }, 
  {
    path: 'view-alldepartment',
    component: ViewAlldepartmentComponent,
  },
  {
    path: 'view-allappointment',
    component: ViewAllappointmentComponent,
  },
  {path: 'view-allvisitors',
    component:ViewAllVisitorsComponent
  },
  {
    path: 'view-appointmment',
    component: ViewAppointmmentComponent,
  },
      {
        path: 'register',
        component: RegisterComponent,
         
      },
      {
        path: 'admin-profile',
        component:AdminProfileComponent,
       }

    ]
  },
  {
    path: 'login',
    // canActivate: [authGuard],
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'dashboard',
    // canActivate: [authGuard],
    component: DashboardComponent,
    data: {
      title: 'Login Page'
    }
   },
   
    
  
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    data: {
      title: 'Reset Password Page'
    }
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
