import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DashboardService } from './dashoboard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart } from 'chart.js';
import * as L from 'leaflet';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  totalVisitorsToday: number = 0;
  serviceRate: number = 0;
  unattendedVisitors: number = 0;
  activeSessions: number = 0;
  tasks: any[] = [];
  allUsers: any[] = [];
  itemsPerPage: number = 5;
  searchText: string = '';
  userForm: FormGroup;
  filteredDepartments: any[] = [];
  departments: any[] = [];  

  constructor(private dashboardService: DashboardService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      user_id: [null],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      userStatus: [false],
      chekinStatus: [false]
    });
  }

  ngOnInit(): void {
    this.fetchTotalVisitorsToday();
    this.getRate();
    this.getUnattendedVisitors();
    this.getActiveSessions();
    this.fetchTasks();
    this.getUserList();
    this.getDepartments();
  }

  ngAfterViewInit(): void {
    this.createSalesChart();
    this.createVisitorChart();
    this.createPieChart();
    this.createSalesGraphChart();
     
  }

  fetchTasks(): void {
    this.dashboardService.fetchTasks().subscribe(data => {
      this.tasks = data;
    });
  }

  fetchTotalVisitorsToday(): void {
    this.dashboardService.getTotalVisitorsToday().subscribe(
      total => {
        this.totalVisitorsToday = total;
      },
      error => {
        console.error('Error fetching total visitors for today', error);
      }
    );
  }

  getRate(): void {
    this.dashboardService.getRate().subscribe(
      rate => {
        this.serviceRate = rate;
      },
      error => {
        console.error('Error fetching service rate', error);
      }
    );
  }

  getUnattendedVisitors(): void {
    this.dashboardService.getUnattendedVisitors().subscribe(
      unattended => {
        this.unattendedVisitors = unattended;
      },
      error => {
        console.error('Error fetching unattended visitors', error);
      }
    );
  }

  getActiveSessions(): void {
    this.dashboardService.getActiveSessions().subscribe(
      sessions => {
        this.activeSessions = sessions;
      },
      error => {
        console.error('Error fetching active sessions', error);
      }
    );
  }

  getUserList(): void {
    this.allUsers = [
      {
        user_id: '1',
        email: 'john@gmail.com',
        password: '123456',
        phone: '+92301789658',
        gender: 'male',
        country: 'Pakistan',
        userStatus: 1,
        loginStatus: 0,
        username: 'john doe'
      },
      {
        user_id: '2',
        email: 'suzan@gmail.com',
        password: '123456',
        phone: '+92693569314',
        country: 'Pakistan',
        gender: 'male',
        userStatus: 1,
        loginStatus: 0,
        username: 'Suzan Miler'
      }
    ];
  }

  updateStatus(user: any): void {
    user.userStatus = !user.userStatus;
    this.dashboardService.updateUserStatus(user).subscribe(
      response => {
        console.log('User status updated successfully', response);
      },
      error => {
        console.error('Error updating user status', error);
      }
    );
  }

  updateChekinStatus(user: any): void {
    user.chekinStatus = !user.chekinStatus;
    this.dashboardService.updateUserCheckinStatus(user).subscribe(
      response => {
        console.log('User check-in status updated successfully', response);
      },
      error => {
        console.error('Error updating user check-in status', error);
      }
    );
  }

  delete(user: any): void {
    if (confirm(`Are you sure you want to delete user ${user.username}?`)) {
      this.dashboardService.deleteUser(user.user_id).subscribe(
        response => {
          this.allUsers = this.allUsers.filter(u => u.user_id !== user.user_id);
          console.log('User deleted successfully', response);
        },
        error => {
          console.error('Error deleting user', error);
        }
      );
    }
  }

  read(user: any): void {
    this.userForm.patchValue(user);
  }

  update(): void {
    if (this.userForm.valid) {
      this.dashboardService.updateUser(this.userForm.value).subscribe(
        response => {
          const index = this.allUsers.findIndex(u => u.user_id === this.userForm.value.user_id);
          if (index > -1) {
            this.allUsers[index] = this.userForm.value;
          }
          console.log('User updated successfully', response);
        },
        error => {
          console.error('Error updating user', error);
        }
      );
    }
  }

  createSalesChart(): void {
    const salesChartCanvas = document.getElementById('sales-chart-canvas') as HTMLCanvasElement;
    const salesChart = new Chart(salesChartCanvas, {
      type: 'line',
      data: this.getSalesChartData(),
      options: this.getSalesChartOptions()
    });
  }

  createVisitorChart(): void {
    const visitorChartCanvas = document.getElementById('visitor-chart-canvas') as HTMLCanvasElement;
    const visitorChart = new Chart(visitorChartCanvas, {
      type: 'bar',
      data: this.getVisitorChartData(),
      options: this.getVisitorChartOptions()
    });
  }

  createPieChart(): void {
    const pieChartCanvas = document.getElementById('pie-chart-canvas') as HTMLCanvasElement;
    const pieChart = new Chart(pieChartCanvas, {
      type: 'doughnut',
      data: this.getPieChartData(),
      options: this.getPieChartOptions()
    });
  }

  createSalesGraphChart(): void {
    const salesGraphChartCanvas = document.getElementById('line-chart') as HTMLCanvasElement;
    const salesGraphChart = new Chart(salesGraphChartCanvas, {
      type: 'line',
      data: this.getSalesGraphChartData(),
      options: this.getSalesGraphChartOptions()
    });
  }

  createVisitorTable(): void {
    // Your implementation for creating the visitor table
  }

  getSalesChartData() {
    return {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1
      }]
    };
  }

  getSalesChartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Month'
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Value'
          }
        }
      }
    };
  }

  getVisitorChartData() {
    return {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Visitors',
          backgroundColor: 'rgba(60,141,188,0.9)',
          borderColor: 'rgba(60,141,188,0.8)',
          data: [200, 150, 300, 100, 400, 200, 250, 300, 350, 400, 450, 500]
        }
      ]
    };
  }

  getVisitorChartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Month'
          },
          grid: {
            display: false
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Visitors'
          },
          grid: {
            display: false
          }
        }
      }
    };
  }
  getDepartments(): void {
    const mockData = [
      { name: 'Finance', servicesOffered: 'Budgeting, Auditing', numberOfPersonnel: 10 },
      { name: 'Human Resources', servicesOffered: 'Recruitment, Training', numberOfPersonnel: 8 },
      { name: 'IT', servicesOffered: 'Technical Support, Development', numberOfPersonnel: 12 },
      { name: 'Marketing', servicesOffered: 'Advertising, Public Relations', numberOfPersonnel: 5 }
    ];
    this.departments = mockData;
    this.filteredDepartments = this.departments; 
  }
/*getDepartments(): void {
  this.dashboardService.getDepartments().subscribe(
    (departments) => {
      this.departments = departments;
    },
    (error) => {
      console.error('Error fetching departments', error);
    }
  );
}*/
  filterDepartments(): void {
    this.filteredDepartments = this.departments.filter(department => {
      const matchesSearchText = department.name.toLowerCase().includes(this.searchText.toLowerCase()); 
      /*const matchesService = department.services.toLowerCase().includes(this.searchText.toLowerCase()); 
      const matchesNo = department.numberOfPersonnel.toLowerCase().includes(this.searchText.toLowerCase()); || matchesService || matchesNo;*/
            
      return matchesSearchText ;
    });
  }
  
  applyFilters(): void {
    // Your implementation for applying filters
  }
  setItemsPerPage(num: number): void {
    this.itemsPerPage = num;
    this.applyFilters();
  }
  getPieChartData() {
    return {
      labels: ['Customer Service', 'Loans', 'Accounts', 'Investments', 'Insurance', 'Mortgages', 'Credit Cards'],
      datasets: [
        {
          data: [200, 150, 300, 100, 400, 200, 250],
          backgroundColor: ['#f56954', '#00a65a', '#f39c12', '#7d3c98', '#2e86c1', '#d35400', '#16a085']
        }
      ]
    };
  }

  getPieChartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      }
    };
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
