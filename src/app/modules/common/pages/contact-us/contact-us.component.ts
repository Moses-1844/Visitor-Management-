import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contuct-us',
  templateUrl: './contact-us.component.html', // Fix the file name here
  styleUrls: ['./contact-us.component.css'] // Fix the file name here
})
export class ContactUsComponent implements OnInit {
  appointmentForm: FormGroup;
  reasons: string[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.appointmentForm = this.fb.group({
      email: ['', Validators.required],
      reason: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchReasons();
  }

  fetchReasons(): void {
    this.http.get<string[]>('http://your-api-url.com/reasons') // Replace with your API endpoint
      .subscribe(
        (data) => {
          this.reasons = data;
        },
        (error) => {
          console.error('Error fetching reasons:', error);
        }
      );
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      const appointment = this.appointmentForm.value;
      const url = 'http://your-api-url.com/addAppointment'; // Replace with your API endpoint
      this.http.post(url, appointment).subscribe(
        (response) => {
          console.log('Appointment booked successfully:', response);
          this.router.navigate(['/success-page']); // Replace with your success page route
        },
        (error) => {
          console.error('Error booking appointment:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
