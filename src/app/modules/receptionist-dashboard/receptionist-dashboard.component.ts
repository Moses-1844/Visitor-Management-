import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DashboardService } from './dashboard.service';
import Swal from 'sweetalert2'; // Assuming you are using sweetalert2 for notifications
import { ConfirmationComponent } from './cinfirmation'; // Adjust the import path as needed

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

  allUsers: any[] = [];
  filteredUsers: any[] = [];
  reasons: any[] = [];
  userForm: FormGroup;
  searchTerm: string = '';
  selectedReason: string = '';
  selectedStatus: number | null = null;
  formSubmissionFlag: boolean = false;
  editPopup: boolean = false;

  @ViewChild('closeModal') closeModal: any; // Assumes there is a template reference variable named 'closeModal'
  constructor(private dashboardService: DashboardService, private cfr: ComponentFactoryResolver, private viewContainer: ViewContainerRef) {}

  ngOnInit(): void {
    this.fetchTotalVisitorsToday();
    this.getRate();
    this.getUnattendedVisitors();
    this.getActiveSessions();
    this.fetchTasks();
    this.getUserList();
    this.getReasonList();
    this.setForm();
  }

  fetchTasks(): void {
    this.dashboardService.fetchTasks().subscribe(data => {
      this.tasks = data;
    });
  }

  fetchTotalVisitorsToday(): void {
    this.dashboardService.getTotalVisitorsToday().subscribe(
      (total) => {
        this.totalVisitorsToday = total;
      },
      (error) => {
        console.error('Error fetching total visitors for today', error);
      }
    );
  }

  getRate(): void {
    this.dashboardService.getRate().subscribe(
      (rate) => {
        this.serviceRate = rate;
      },
      (error) => {
        console.error('Error fetching service rate', error);
      }
    );
  }

  getUnattendedVisitors(): void {
    this.dashboardService.getUnattendedVisitors().subscribe(
      (unattended) => {
        this.unattendedVisitors = unattended;
      },
      (error) => {
        console.error('Error fetching unattended visitors', error);
      }
    );
  }

  getActiveSessions(): void {
    this.dashboardService.getActiveSessions().subscribe(
      (sessions) => {
        this.activeSessions = sessions;
      },
      (error) => {
        console.error('Error fetching active sessions', error);
      }
    );
  }

  getUserList(): void {
    this.allUsers = [
      {
        user_id: '1',
        email: 'john@gmail.com',
        company: 'AM123',
        reason: 'Meeting',
        chekinStatus: 0,
        username: 'Moses James'
      },
      {
        user_id: '2',
        email: 'peter@gmail.com',
        company: '12Vmk',
        reason: 'Meeting',
        chekinStatus: 1,
        username: 'Philip Nyanchoka'
      },
    ];
    this.filteredUsers = this.allUsers;
  }
/*getUserList() {
    this.projectsService.getUserList().subscribe(users => {
      this.allUsers = users;
      this.filteredUsers = this.allUsers;
    });
  }*/
  getReasonList(): void {
    this.reasons = [
      { id: 1, reasonName: 'Meeting' },
      { id: 2, reasonName: 'Interview' },
      { id: 3, reasonName: 'Delivery' }
    ];
  }
  /*
getReasonList() {
  this.projectsService.getReasonList().subscribe(reasons => {
    this.reasons = reasons;
  });
}
  */
  setForm(): void {
    this.userForm = new FormGroup({
      user_id: new FormControl(null),
      roleId: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      userStatus: new FormControl(),
      chekinStatus: new FormControl(),
      phone: new FormControl(null, [Validators.required]),
      company: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      reason: new FormControl(null, [Validators.required])
    });
  }

  filterVisitors(): void {
    this.filteredUsers = this.allUsers.filter(user => {
      const matchesSearchTerm = user.username.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesReason = this.selectedReason ? user.reason === this.selectedReason : true;
      const matchesStatus = this.selectedStatus !== null ? user.chekinStatus === this.selectedStatus : true;
      return matchesSearchTerm && matchesReason && matchesStatus;
    });
  }

  updateChekinStatus(item: any): void {
    item.chekinStatus = item.chekinStatus ? 0 : 1;
    this.userForm.patchValue({ 'chekinStatus': item.chekinStatus });
    this.userForm.patchValue(item);
    this.update();
  }

  read(i: any): void {
    this.userForm.patchValue(i);
    this.editPopup = true;
  }

  update(): void {
    this.formSubmissionFlag = true;
    const formData: any = new FormData();
    formData.append('user_id', this.userForm.value.user_id);
    formData.append('roleId', this.userForm.value.roleId);
    formData.append('email', this.userForm.value.email);
    formData.append('username', this.userForm.value.username);
    formData.append('phone', this.userForm.value.phone);
    formData.append('date', this.userForm.value.date);
    formData.append('chekinStatus', this.userForm.value.chekinStatus);

    this.dashboardService.updateUser(formData).subscribe(() => {
      Swal.fire({
        title: '',
        text: 'User updated Successfully',
        icon: 'success',
        confirmButtonText: 'Close'
      });
      this.formSubmissionFlag = false;
      this.closeModal.nativeElement.click();
    }, error => {
      this.formSubmissionFlag = false;
      console.error('Error updating user', error);
    });
  }

  delete(i: any): void {
    const factory = this.cfr.resolveComponentFactory(ConfirmationComponent);
    const componentRef = this.viewContainer.createComponent(factory);
    componentRef.instance.visible = true;
    componentRef.instance.action.subscribe(x => {
      if (x) {
        this.dashboardService.deleteUser(i).subscribe(() => {
          componentRef.instance.visible = false;
          Swal.fire({
            title: '',
            text: 'Project Deleted Successfully',
            icon: 'success',
            confirmButtonText: 'Close'
          });
        }, error => {
          console.error('Error deleting project', error);
          Swal.fire({
            title: 'Error',
            text: 'Failed to delete project. Please try again later.',
            icon: 'error',
            confirmButtonText: 'Close'
          });
        });
      } else {
        Swal.fire({
          title: '',
          text: 'Delete action cancelled.',
          icon: 'info',
          confirmButtonText: 'Close'
        });
      }
    });
  }
}
