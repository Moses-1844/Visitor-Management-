/*import { Component } from '@angular/core';
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
    //chek the user role  dont worry about email and psasword just route based on the role
   if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      const role = this.loginForm.value.role;

      this.authService.signIn(email, password).subscribe(
        (response: any) => {
          // Assuming response is an array of users, check if user exists
          const user = response.find((user: any) => user.email === email && user.password === password);
          if (user) {
            this.authService.setRole(role);
            if (role === 'admin') {
              this.router.navigate(['/admin-dashboard']);
            } else if (role === 'receptionist') {
              this.router.navigate(['/receptionist-dashboard']);
            }
          } else {
            this.isError = true;
            console.error('Login error', 'Invalid email or password');
          }
        },
        (error: any) => {
          this.isError = true;
          console.error('Login error', error);
        }
      );
    }
  }

  moveToForgetPassword() {
    this.router.navigate(['reset-password']);
  }
  }*/
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
  
