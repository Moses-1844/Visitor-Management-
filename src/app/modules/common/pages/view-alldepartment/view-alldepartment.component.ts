import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import the HttpClient module

@Component({
  selector: 'app-view-alldepartment',
  
  templateUrl: './view-alldepartment.component.html',
  styleUrl: './view-alldepartment.component.css'
})
export class ViewAlldepartmentComponent implements OnInit {
  department: string[] = [];
  errorMessage: string;
  itemsPerPage: number;

  // Inject the HttpClient module
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getDepartmentList();
  }

  getDepartmentList() {
     
      const url = `https://mrvisitease.com:8080/api/departments`;
      this.http.get<any>(url, { responseType: 'json' }).subscribe(
        (response) => {
          this.department = response.map(dept => dept);           
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
  }
  setItemsPerPage(num: number): void {
    this.itemsPerPage = num;
    this.getDepartmentList();
  }
}
