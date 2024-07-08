import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  addDepartmentForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    id: new FormControl('', [Validators.required])  
  });

  successMessage: string = '';
  errorMessage: string = '';
  institutionId: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.institutionId = localStorage.getItem('institutionId');
    if (this.institutionId) {
      this.addDepartmentForm.get('id')?.setValue(this.institutionId);
    }
  }

  addDepartment() {
    if (this.addDepartmentForm.valid) {
      const payload = {    
        institutionId: this.addDepartmentForm.value.id,
        departmentname: this.addDepartmentForm.value.name
      };
     
      console.log('Payload:', payload);
      const url = `https://mrvisitease.com:8080/api/departments?institutionId=${this.institutionId}`;

      console.log('URL:', url);

      this.http.post<any>(url, payload)
        .subscribe({
          next: (response) => {
            this.successMessage = 'Department added successfully';
            this.errorMessage = '';
            this.addDepartmentForm.reset(); // Clear form fields
            if (this.institutionId) {
              this.addDepartmentForm.get('id')?.setValue(this.institutionId); // Retain institutionId
            }
          },
          error: (error) => {
            this.errorMessage = 'Error adding department';
            this.successMessage = '';
            console.error('Error adding department', error);
          }
        });
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
      this.successMessage = '';
    }
  }
}
