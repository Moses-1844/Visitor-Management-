import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { VisitorService } from '../visitor.service';

@Component({
  selector: 'app-contuct-us',
  templateUrl: './contact-us.component.html', // Fix the file name here
  styleUrls: ['./contact-us.component.css'] // Fix the file name here
})
export class ContactUsComponent implements OnInit {
  appointmentForm: FormGroup;
  reasons: string[] = [];
  institutionId= localStorage.getItem('institutionId'); 
  department: any;
  errorMessage: string;
   

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private visitorService: VisitorService
  ) {
    this.appointmentForm = this.fb.group({
      email: ['', Validators.required],
      reason: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  ngOnInit(): void {
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
