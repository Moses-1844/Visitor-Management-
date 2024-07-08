import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VisitorService } from '../visitor.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  appointmentId: number;
  passcode: string;
  error: string | null;

  constructor(private visitorService: VisitorService) { }

  checkIn() {
    const passcode = {
      appointmentId: this.appointmentId,
      passcode: this.passcode
    };

    this.visitorService.checkIn(passcode).subscribe(
      (response) => {
        this.error = null;
        console.log('Check-in successful!', response);
        alert('Check-in successful!');
      },
      (error) => {
        this.error = error;
        console.error(error);
      }
    );
  }

  checkOut() {
    const passcode = {
      appointmentId: this.appointmentId,
      passcode: this.passcode
    };

    this.visitorService.checkOut(passcode).subscribe(
      (response) => {
        this.error = null;
        console.log('Check-out successful!', response);
        alert('Check-out successful!');
      },
      (error) => {
        this.error = error;
        console.error(error);
      }
    );
  }
}
