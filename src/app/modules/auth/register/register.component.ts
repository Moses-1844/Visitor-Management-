import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpHeaders, HttpClient } from '@angular/common/http'; // Updated to include HttpClient

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), this.strongPasswordValidator.bind(this)]),
    username: new FormControl('', [Validators.required]),
    institutionId: new FormControl(localStorage.getItem('institutionId'))
  });

  isError: boolean = false;
  passwordError: boolean = false;
  serverError: boolean = false;
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient // Inject HttpClient
  ) { }

  ngOnInit(): void {
    console.log('localStorage.getItem(institutionId):', localStorage.getItem('institutionId'));
    console.log('this.userForm:', this.userForm.value);
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

    const institutionId = this.userForm.value.institutionId; // Now dynamic based on form input
    const url = `https://mrvisitease.com:8080/api/users/receptionist?institutionId=${institutionId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': '*/*' // Adjust headers as necessary
    });
    const payload = {
      userid: 0, // Adjust according to whether this needs to be dynamically set
      username: this.userForm.value.username,
      password: this.userForm.value.password,
      email: this.userForm.value.email
    };
 console.log('payload:', payload);
    this.http.post(url, payload, { headers }).subscribe({
      next: (response) => {         
        console.log('Registration successful:', response);
        alert('Registration successful');
      },
      error: (error) => {
        this.serverError = true;
        this.snackBar.open('Registration failed. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        console.error('Registration error:', error);
      }
    });
  }
}