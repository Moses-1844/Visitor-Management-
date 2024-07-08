import { NgModule ,  CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultLayoutModule } from './core/default-layout/default-layout.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { LoginComponent } from './modules/auth/login/login.component';
import { SharedAppModule } from './core/shared/shared.module';
import { RegisterComponent } from './modules/auth/register/register.component';
import { ResetPasswordComponent } from './modules/auth/reset-password/reset-password.component';
import { FeatureGuard } from './core/permission/guards/feature.guard';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './core/shared/interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReceptionistDashboardComponent } from './modules/receptionist-dashboard/receptionist-dashboard.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button'
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule } from '@angular/forms';
import { AdminProfileComponent } from './modules/common/pages/admin-profile/admin-profile.component';
import { OwnerDashboardComponent } from './modules/owner-dashboard/owner-dashboard.component';
import { AddDepartmentComponent } from './modules/common/pages/add-department/add-department.component';  
import { ViewAppointmmentComponent } from './modules/common/pages/view-appointmment/view-appointmment.component';  
import { ViewAllVisitorsComponent } from './modules/common/pages/view-allvisitors/view-allvisitors.component';
import { ViewAllappointmentComponent } from './modules/common/pages/view-allappointment/view-allappointment.component';
import { ViewAlldepartmentComponent } from './modules/common/pages/view-alldepartment/view-alldepartment.component';  
@NgModule({ declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        ResetPasswordComponent,
        ReceptionistDashboardComponent,
        OwnerDashboardComponent,
        AdminProfileComponent,
        AddDepartmentComponent,
        ViewAppointmmentComponent,
        ViewAllVisitorsComponent,
        ViewAllappointmentComponent,
        ViewAlldepartmentComponent
        

    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        DefaultLayoutModule,
        DashboardModule,
        SharedAppModule,
        BrowserAnimationsModule,
        NgbModule,
        MatSnackBarModule,
        FullCalendarModule,
        MatButtonModule,
        FormsModule
    
    ], 
        
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
        
        providers: [
        FeatureGuard,
        // {
        //   provide: LocationStrategy,
        //   useClass: HashLocationStrategy
        // },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule { }
