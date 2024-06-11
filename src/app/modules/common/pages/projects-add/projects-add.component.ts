import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Visitor } from './visitor.model';
import { Appointment } from './visitor.model';

@Component({
  selector: 'app-projects-add',
  templateUrl: './projects-add.component.html',
  styleUrls: ['./projects-add.component.css']
})
export class ProjectsAddComponent implements OnInit {
  visitorForm: FormGroup;
  reasons: string[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.visitorForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      company: ['', Validators.required],
      reason: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchReasons();
  }
  fetchReasons(): void {
    const url = 'http://your-api-url.com/reasons'; // Replace with your API endpoint URL for fetching reasons
    this.http.get<string[]>(url).subscribe(
      (response) => {
        this.reasons = response;
      },
      (error) => {
        console.error('Error fetching reasons:', error);
      }
    );
  }
  onRegister(): void {
    if (this.visitorForm.valid) {
      const visitor: Visitor = {
        name: this.visitorForm.get('name')?.value,
        phone: this.visitorForm.get('phone')?.value,
        email: this.visitorForm.get('email')?.value,
        company: this.visitorForm.get('company')?.value
      };

      const url = 'http://your-api-url.com/addVisitor'; // Replace with your API endpoint URL for visitors
      this.http.post(url, visitor).subscribe(
        (response: any) => {
          console.log('Visitor added successfully:', response);
          
        },
        (error) => {
          console.error('Error adding visitor:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  onSubmit(): void {
    if (this.visitorForm.valid ) {
      const appointment: Appointment = {
        reason: this.visitorForm.get('reason')?.value,
        date: this.visitorForm.get('date')?.value,
        time: this.visitorForm.get('time')?.value,
        email: this.visitorForm.get('email')?.value
      };

      const url = 'http://your-api-url.com/addAppointment'; // Replace with your API endpoint URL for appointments
      this.http.post(url, appointment).subscribe(
        (response) => {
          console.log('Appointment added successfully:', response);
        },
        (error) => {
          console.error('Error adding appointment:', error);
        }
      );
    } else {
      console.error('Form is invalid or visitor not registered');
    }
  }
}
