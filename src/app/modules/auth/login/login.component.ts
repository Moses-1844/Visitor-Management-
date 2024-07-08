import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    role: new FormControl(null, [Validators.required])
  });

  isError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSignIn() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      const role = this.loginForm.value.role; // Get the selected role
      console.log('before login ', this.loginForm.value);
      // Check if a role is selected
      if (role) {
        this.authService.signIn(email, password, role).subscribe(
          (response: any) => {
            if (response && response.role) {
              this.authService.setRole(response.role);
              this.authService.setUserDetails(response.userId, response.institutionId);
              console.log('after login ', response);
              localStorage.setItem('institutionId', response.institutionId);
              localStorage.setItem('userId', response.userId);
              console.log('strodered institution: ', localStorage.getItem('institutionId'));
              switch (response.role) {
                case 'INSTITUTION_ADMIN':
                  this.router.navigate(['/admin-dashboard']);
                  break;
                case 'RECEPTIONIST':
                  this.router.navigate(['/receptionist-dashboard']);
                  break;
                case 'SUPERADMIN':
                  this.router.navigate(['/owner-dashboard']);
                  break;
                default:
                  this.isError = true;
                  Swal.fire({
                    title: 'Role Mismatch',
                    text: 'The selected role does not match the role returned by the server.',
                    icon: 'error',
                    confirmButtonText: 'Close'
                  });
              }
            } else {
              this.isError = true;
              Swal.fire({
                title: 'Login Error',
                text: 'Invalid email or password',
                icon: 'error',
                confirmButtonText: 'Close'
              });
            }
          },
          (error: any) => {
            this.isError = true;
            Swal.fire({
              title: 'Login Error',
              text: error.message || 'An error occurred during login. Please try again.',
              icon: 'error',
              confirmButtonText: 'Close'
            });
          }
        );
      } else {
        // Handle error if no role is selected
        this.isError = true;
        console.error('Role not selected', 'Please select a role');
        Swal.fire({
          title: 'Role Not Selected',
          text: 'Please select a role before proceeding.',
          icon: 'error',
          confirmButtonText: 'Close'
        });
      }
    } else {
      this.isError = true;
      Swal.fire({
        title: 'Form Invalid',
        text: 'Please fill in all required fields correctly.',
        icon: 'error',
        confirmButtonText: 'Close'
      });
    }
    console.log(this.loginForm.value);
  }

  moveToForgetPassword() {
    this.router.navigate(['reset-password']);
  }
}
/*

  import { Component } from '@angular/core';
  import { FormGroup, FormControl, Validators } from '@angular/forms';
  import { Router } from '@angular/router';
  import { AuthService } from '../services/auth.service';
  
  @Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
  export class LoginComponent {
    loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      role: new FormControl(null, [Validators.required])
    });
  
    isError: boolean = false;
  
    constructor(private authService: AuthService, private router: Router) {}
  
    onSignIn() {
      const role = this.loginForm.value.role; // Get the selected role
  
      // Check if a role is selected
      if (role) {
        this.authService.setRole(role); // Set the role in AuthService
  
        // Route based on the selected role
        if (role === 'admin') {
    this.router.navigate(['/admin-dashboard']);
} else if (role === 'receptionist') {
    this.router.navigate(['/receptionist-dashboard']);
} else if (role === 'owner') {
    this.router.navigate(['/owner-dashboard']); // Navigate to owner dashboard for owner
}
      } else {
        // Handle error if no role is selected
        this.isError = true;
        console.error('Role not selected', 'Please select a role');
      }
    }
  
    moveToForgetPassword() {
      this.router.navigate(['reset-password']);
    }
  }
   */