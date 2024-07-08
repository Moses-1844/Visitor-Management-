import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for making HTTP requests

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  retrievedData: any; // Variable to store retrieved data

  constructor(private http: HttpClient) { } // Inject HttpClient into the constructor

  ngOnInit(): void {
    // Call a method to retrieve data when the component initializes
    this.retrieveData();
  }

  retrieveData(): void {
    const eventId = 123; // Example event ID
    const url = `http://your-api-url.com/retrieveData/${eventId}`; // Replace with your API endpoint URL

    this.http.get(url).subscribe(
      (response) => {
        // Handle successful response
        this.retrievedData = response; // Store retrieved data in the component variable
        console.log('Retrieved data:', this.retrievedData);
      },
      (error) => {
        // Handle error
        console.error('Error retrieving data:', error);
      }
    );
  }
}
