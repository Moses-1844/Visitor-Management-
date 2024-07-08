import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { VisitorService } from '../visitor.service';
import { error } from 'jquery';

@Component({
  selector: 'app-projects-add',
  templateUrl: './projects-add.component.html',
  styleUrls: ['./projects-add.component.css']
})
export class ProjectsAddComponent implements OnInit {
  visitorForm: FormGroup;
  appointmentForm: FormGroup;
  department: string[] = [];
  password: string = 'default';
  institutionId: string | null = null;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private visitorService: VisitorService
  ) {
    this.visitorForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      company: ['', Validators.required]
    });
    this.appointmentForm = this.fb.group({
      department: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.institutionId = localStorage.getItem('institutionId');
    console.log('Institution ID:', this.institutionId);
    this.fetchDepartment();
    
  }

  fetchDepartment(): void {
    if (this.institutionId) {
      const url = `https://mrvisitease.com:8080/api/departments/institution/${this.institutionId}`;
      this.http.get<any>(url, { responseType: 'json' }).subscribe(
        (response) => {
          this.department = response.map(dept => dept.departmentname);
          console.log('Department fetched successfully:', this.department);
        },
        (error) => {
          console.error('Error fetching department:', error);
          if (error.status === 500) {
            this.errorMessage = 'Server error occurred. Please try again later.';
          } else {
            this.errorMessage = 'An error occurred. Please try again later.';
          }
        }
      );
    } else {
      console.error('Institution ID is missing');
      this.errorMessage = 'Institution ID is missing. Please contact support.';
    }
  }

  onSubmit(): void {
    console.log('Submitting Visitor Form:', this.visitorForm);
    if (this.visitorForm.valid) {
      const visitor = {
        visitorname: this.visitorForm.get('name')?.value,
        phone_number: this.visitorForm.get('phone')?.value,
        email: this.visitorForm.get('email')?.value,
        company: this.visitorForm.get('company')?.value,
        password: this.password
      };

      this.visitorService.registerVisitor(visitor).subscribe(
        (response) => {
          console.log('Visitor registered successfully:', response);
          localStorage.setItem('visitorId', response.visitorid);
          console.log('Visitor ID:', localStorage.getItem('visitorId'));
          alert('Visitor registered successfully');
          this.visitorForm.reset();
        },
        (error) => {
          console.error('Error registering visitor:', error);
          alert('Error registering visitor');
        }
      );
    } else {
      console.error('Form is invalid');
      error('Form is invalid');
    }
  }
 
  
  bookAppointment(): void {
    console.log('Submitting Appointment Form:', this.appointmentForm);
    if (this.appointmentForm.valid) {
      const department = this.appointmentForm.get('department')?.value;
      const visitorId = localStorage.getItem('visitorId'); // Get visitorId from localStorage
  
      // Log visitorId to check its value
      console.log('Visitor ID:', visitorId);
  
      const rawDate = this.appointmentForm.get('date')?.value;
      const rawTime = this.appointmentForm.get('time')?.value;
  
      const formattedDate = new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(rawDate));
      const formattedTime = new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date(`1970-01-01T${rawTime}`));
  
      const appointment = {
        appointmentid: 0,
        visitor: {
          visitorid: visitorId
        },
        institution: {
          id: this.institutionId
        },
        date: formattedDate,
        time: formattedTime,
        department: department
      };
  
      this.visitorService.createAppointment(appointment).subscribe(
        (response) => {
          console.log('Appointment added successfully:', response);
          alert('Appointment added successfully');
          this.appointmentForm.reset();
        },
        (error) => {
          alert('Error adding appointment');
          console.error('Error adding appointment:', error);
        }
      );
    } else {
      alert('Form is invalid');
      console.error('Form is invalid');
    }
  }
  
}
