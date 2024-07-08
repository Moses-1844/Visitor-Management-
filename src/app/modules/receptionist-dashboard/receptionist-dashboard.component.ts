import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import { VisitorService } from '../common/pages/visitor.service';
import { DashboardService } from './dashboard.service';
import Swal from 'sweetalert2'; // Assuming you are using sweetalert2 for notifications

@Component({
  selector: 'app-receptionist-dashboard',
  templateUrl: './receptionist-dashboard.component.html',
  styleUrls: ['./receptionist-dashboard.component.css']
})
export class ReceptionistDashboardComponent implements OnInit {
  totalVisitorsToday: number = 0;
  serviceRate: number = 0;
  unattendedVisitors: number = 0;
  activeSessions: number = 0;
  tasks: any[] = [];
  department: string[] = [];
  filteredDepartments: any[] = [];
  itemsPerPage: number = 5; 

  @ViewChild('closeModal') closeModal: any; // Assumes there is a template reference variable named 'closeModal'
  errorMessage: string;
  institutionId = localStorage.getItem('institutionId');
  allVisitors: any;
  filteredVisitors: any[] = [];

  constructor(
    private dashboardService: DashboardService, 
    private cfr: ComponentFactoryResolver, 
    private viewContainer: ViewContainerRef, 
    private http: HttpClient,
    private visitorService: VisitorService
  ) {}

  ngOnInit(): void {        
    this.getVisitorList();       
    this.getDepartmentList(); 
  }

  ngAfterViewInit(): void {
    this.createSalesGraphChart();
  }

  getDepartmentList() {
    if (this.institutionId) {
      const url = `https://mrvisitease.com:8080/api/departments/institution/${this.institutionId}`;
      this.http.get<any>(url, { responseType: 'json' }).subscribe(
        (response) => {
          this.department = response.map(dept => dept);
          this.unattendedVisitors = this.department.length;
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

  setItemsPerPage(num: number): void {
    this.itemsPerPage = num;
    this.getDepartmentList();
  }

  async getVisitorList() {
    const institutionId = Number(localStorage.getItem('institutionId'));
    if (institutionId) {
      this.visitorService.getAppointmentsByInstitutionId(institutionId).subscribe(
        (appointments) => {
          console.log('Appointments:', appointments);
          this.allVisitors = appointments; 
          this.totalVisitorsToday = this.allVisitors.length
          this.filteredVisitors = appointments;          
        },
        (error) => {
          alert('An error occurred while fetching appointments. Please try again.');
          console.error('Error fetching appointments:', error);
        }
      );
    } else {
      console.error('Institution ID not found in local storage.');
    }
  }

  createSalesGraphChart(): void {
    const salesGraphChartCanvas = document.getElementById('line-chart') as HTMLCanvasElement;
    const salesGraphChart = new Chart(salesGraphChartCanvas, {
      type: 'line',
      data: this.getSalesGraphChartData(),
      options: this.getSalesGraphChartOptions()
    });
  }

  getSalesGraphChartData() {
    return {
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      datasets: [
        {
          label: 'Visitors',
          fill: false,
          borderWidth: 2,
          lineTension: 0,
          spanGaps: true,
          borderColor: '#efefef',
          pointRadius: 3,
          pointHoverRadius: 7,
          pointColor: '#efefef',
          pointBackgroundColor: '#efefef',
          data: [200, 300, 250, 350, 400, 450, 300]
        }
      ]
    };
  }

  getSalesGraphChartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Day'
          },
          grid: {
            display: false,
            color: '#efefef',
            drawBorder: false
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Visitors'
          },
          grid: {
            display: true,
            color: '#efefef',
            drawBorder: false
          }
        }
      }
    };
  }
}
