import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  roles: string[] = []; // Declare the 'roles' property
  
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), this.strongPasswordValidator]),
    password_confirmation: new FormControl('', [Validators.required, Validators.minLength(8), this.strongPasswordValidator]),
    username: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
  });

  isError: boolean = false;
  passwordError: boolean = false;
  serverError: boolean = false;
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(): void {
    const url = 'http://your-api-url.com/roles'; // Replace with your API endpoint URL for fetching roles
    /* this.http.get<string[]>(url).subscribe(
      (response) => {
        this.roles = response;
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    ); */

    // Mock roles for testing
    this.roles = ['admin', 'receptionist'];
  }

  strongPasswordValidator(control: FormControl): { [key: string]: any } | null {
    const value: string = control.value;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
    const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialCharacters;
    return valid ? null : { strongPassword: true };
  }

  onRegister() {
    this.serverError = false;
    this.successMessage = '';
    this.isError = false;
    this.passwordError = false;

    if (this.userForm.invalid) {
      this.isError = true;
      this.snackBar.open('Form is invalid. Please check the fields.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      console.log('Form is invalid', this.userForm.errors);
      return;
    }

    if (this.userForm.value.password !== this.userForm.value.password_confirmation) {
      this.passwordError = true;
      this.snackBar.open('Passwords do not match.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      console.log('Passwords do not match');
      return;
    }

    this.authService.register(this.userForm.value).subscribe(
      (res: any) => {
        if (res.status === 'success') {
          this.successMessage = 'Registration successful!';
          this.snackBar.open(this.successMessage, 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/login']);
        } else {
          this.serverError = true;
          this.snackBar.open('Registration failed. Please try again.', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.log('Registration failed', res);
        }
      },
      err => {
        this.serverError = true;
        this.snackBar.open('Server error. Please try again later.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        console.error('Server error', err);
      }
    );
  }
}
