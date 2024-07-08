import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BankService } from './bank.service'; // Correct the import path
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  institutionForm = this.fb.group({
    name: ['', Validators.required],
    contactNumber: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    location: ['', Validators.required],
    zipCode: ['', Validators.required],
    registrationNumber: ['', Validators.required],
  });
  
  adminForm = this.fb.group({
    adminEmail: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', Validators.required],  
    id: ['', Validators.required]  
  });

  constructor(
    private fb: FormBuilder,
    private bankService: BankService
  ) { }

  ngOnInit(): void {
    
  }
 
  onSubmit(): void {
    if (this.institutionForm.valid) {
      const institutionDetails = {
        name: this.institutionForm.get('name')?.value,
        contactNumber: this.institutionForm.get('contactNumber')?.value,
        email: this.institutionForm.get('email')?.value,
        address: `${this.institutionForm.get('location')?.value}-${this.institutionForm.get('zipCode')?.value}`,
        registrationNumber: this.institutionForm.get('registrationNumber')?.value
      };

      this.bankService.registerInstitution(institutionDetails).subscribe(
        response => {
          console.log('Institution registered successfully', response);
          localStorage.setItem('institutionId', response.id);
          this.showSuccessAlert('Institution registered successfully!');
          this.institutionForm.reset();
        },
        error => {
          console.error('Error registering institution', error);
          this.showErrorAlert('Error registering institution');
        }
      );
    } else {
      console.log('this.institutionForm:', this.institutionForm);
    }
  }

  onRegister(): void {
    
    if (this.adminForm.valid) {
       
  
      const adminDetails = {
        email: this.adminForm.get('adminEmail')?.value,
        username: this.adminForm.get('username')?.value,
        password: this.adminForm.get('password')?.value,
        institutionId: this.adminForm.get('id')?.value,
      };
      console.log('adminDetails:', adminDetails);
      this.bankService.registerAdmin(adminDetails).subscribe(
        response => {
          console.log('Admin registered successfully', response);
          this.showSuccessAlert('Admin registered successfully!');
          this.adminForm.reset();
        },
        error => {
          console.error('Error registering admin', error);
          this.showErrorAlert('Error registering admin');
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  
  showSuccessAlert(message: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
      confirmButtonText: 'OK'
    });
  }

  showErrorAlert(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonText: 'OK'
    });
  }
}
