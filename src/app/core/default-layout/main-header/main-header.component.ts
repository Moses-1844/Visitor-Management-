import { AuthService } from './../../../modules/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { AuthService } from 'src/app/modules/auth/services/auth.service'; // Import AuthService

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {
  appointments: any[] = []; // Array to store fetched appointments
  loggedInUsers: any[] = [];
  isAdmin: boolean = false;
  isReceptionist: boolean = false;

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchAppointments(); 
  
    const userRole = this.authService.getRole();  
  
    if (userRole === 'admin') {
      this.isAdmin = true;
      this.fetchLoggedInUsers(); // Fetch logged-in users only if the user is an admin
    } else {
      this.isAdmin = false;
    }
  }
  

  fetchAppointments() {
    // Mock data for testing
    this.appointments = [
      {
        "name": "John Doe",
        "department": "Marketing",
        "time": "2024-06-10T09:00:00"
      },
      {
        "name": "Jane Smith",
        "department": "HR",
        "time": "2024-06-10T10:30:00"
      },
      {
        "name": "Alice Johnson",
        "department": "Finance",
        "time": "2024-06-10T13:45:00"
      }
    ];

    // Uncomment the below code and replace 'your-api-endpoint' with the actual API endpoint to fetch appointments from the server

    /*
    this.http.get<any[]>('your-api-endpoint').subscribe(
      (data) => {
        // Assign fetched appointments to the appointments array
        this.appointments = data;
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
    */
  }
  getInitials(name: string): string {
    const names = name.split(' ');
    const initials = names.map(name => name.charAt(0)).join('');
    return initials.toUpperCase();
  }
  fetchLoggedInUsers() {
    // Mock data for logged-in users
    this.loggedInUsers = [
      { role: 'Admin', name: 'John Doe', time: '10:00 AM' },
      { role: 'User', name: 'Jane Smith', time: '11:30 AM' },
      { role: 'Manager', name: 'Alex Johnson', time: '1:45 PM' }
      // Add more users if needed
    ];
  } 
}
