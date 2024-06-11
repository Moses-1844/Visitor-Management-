import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashoboard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalVisitorsToday: number = 0;
  serviceRate: number = 0;
  unattendedVisitors: number = 0;
  activeSessions: number = 0;
  tasks: any[] = [];
  ngAfterViewInit(): void {
    this.initializeDashboard();
  }
  allUsers: any[] = [];
  userForm: FormGroup;

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
  private initializeDashboard(): void {
    
    $(function () {
      'use strict';
    });
  }
  ngOnInit(): void {
    this.fetchTotalVisitorsToday();
    this.getRate();
    this.getUnattendedVisitors();
    this.getActiveSessions();
    this.fetchTasks();
    this.getUserList();
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
  getUserList() {
    this.allUsers = [
      {
        user_id: '1',
        email:'john@gmail.com',
        password:'123456',
        phone:'+92301789658',
        gender:'male',
        country:'Pakistan',
        userStatus:1,
        loginStatus:0,
        username:'john doe'
      },
      {
        user_id: '2',
        email:'suzan@gmail.com',
        password:'123456',
        phone:'+92693569314',
        country:'Pakistan',
        gender:'male',
        userStatus:1,
        loginStatus:0,
        username:'Suzan Miler'
      }
    ];
  }
  
  /*getUserList(): void {
    this.dashboardService.getAllUsers().subscribe(
      users => {
        this.allUsers = users;
      },
      error => {
        console.error('Error fetching users', error);
      }
    );
  }*/

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
    this.dashboardService.updateUserChekinStatus(user).subscribe(
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
}
