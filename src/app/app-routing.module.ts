import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './modules/auth/guards/auth.guard';
import { DefaultLayoutComponent } from './core/default-layout/default-layout.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { ResetPasswordComponent } from './modules/auth/reset-password/reset-password.component';
import { ReceptionistDashboardComponent } from './modules/receptionist-dashboard/receptionist-dashboard.component';

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
       
      {
        path: 'simple-table',
        loadChildren: () =>
          import('./modules/common/tables/simple-table/simple-table.module').then((m) => m.DataTableModule)
      },
       
      
       
     
      { path: 'invoice', loadChildren: () => import('./modules/common/pages/invoice/invoice.module').then(m => m.InvoiceModule) },
      { path: 'profile', loadChildren: () => import('./modules/common/pages/profile/profile.module').then(m => m.ProfileModule) },
      
      { path: 'projects', loadChildren: () => import('./modules/common/pages/projects/projects.module').then(m => m.ProjectsModule) },
      { path: 'projects-add', loadChildren: () => import('./modules/common/pages/projects-add/projects-add.module').then(m => m.ProjectsAddModule) },
      { path: 'project-edit', loadChildren: () => import('./modules/common/pages/project-edit/project-edit.module').then(m => m.ProjectEditModule) },
      { path: 'project-detail', loadChildren: () => import('./modules/common/pages/project-detail/project-detail.module').then(m => m.ProjectDetailModule) },
      { path: 'contacts', loadChildren: () => import('./modules/common/pages/contacts/contacts.module').then(m => m.ContactsModule) },
      { path: 'faq', loadChildren: () => import('./modules/common/pages/faq/faq.module').then(m => m.FaqModule) },
      { path: 'contact-us', loadChildren: () => import('./modules/common/pages/contact-us/contact-us.module').then(m => m.ContactUsModule) },
      {
        path: 'receptionist-dashboard',
         component: ReceptionistDashboardComponent,  
         data: { 
           expectedRole: 'receptionist' }
    }, 
       
      {
        path: 'register',
        component: RegisterComponent,
         
      },

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
