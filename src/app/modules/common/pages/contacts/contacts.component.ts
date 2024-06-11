import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  id: number;
  visitorDetails: any;
  error: string;

  constructor(private http: HttpClient) { }

  getVisitorDetails() {
    this.http.get(`api-url-to-fetch-visitor-details/${this.id}`).subscribe(
      (data: any) => {
        this.visitorDetails = data;
        this.error = null;
      },
      (error) => {
        this.error = 'An error occurred while fetching visitor details. Please try again.';
        console.error(error);
      }
    );
  }
  checkIn() {
  const checkInData = {
    id: this.id,
    checkInDateTime: new Date().toISOString()
  };

  this.http.post('api-url-to-check-in', checkInData).subscribe(
    () => {
      this.error = null;
      alert('Check-in successful!');
    },
    (error) => {
      this.error = 'An error occurred while checking in. Please try again.';
      console.error(error);
    }
  );
}
checkOut() {
  const checkOutData = {
    id: this.id,
    checkOutDateTime: new Date().toISOString()
  };

  this.http.post('api-url-to-check-out', checkOutData).subscribe(
    () => {
      this.error = null;
      alert('Check-out successful!');
    },
    (error) => {
      this.error = 'An error occurred while checking out. Please try again.';
      console.error(error);
    }
  );
}
}
