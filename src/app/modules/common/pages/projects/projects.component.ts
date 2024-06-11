import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { ConfirmationComponent } from 'src/app/core/shared/components/confirmation/confirmation.component';
import { RolesService } from 'src/app/core/shared/services/roles.service';
import { HttpClient } from '@angular/common/http';
import { SocketService } from 'src/app/core/shared/socket.service';
import {ProjectsService } from './projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;

  selectedRoles: any = [];
  userInfo: any;
  userForm: FormGroup;
  allUsers: any = [];
  filteredUsers: any = [];
  userRoles: any = [];
  errors: any = [];
  formError: any = {};
  message: string; 
  
  serverError: boolean;
  editPopup: boolean;
  formSubmissionFlag: boolean = false;

  reasons: any = [];
  searchTerm: string = '';
  selectedReason: string = '';
  selectedStatus: string = '';

  constructor(
    private roleService: RolesService,
    private socket: SocketService,
    private http: HttpClient,
    private viewContainer: ViewContainerRef,
    private projectsService: ProjectsService,
    private cfr: ComponentFactoryResolver

  ) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  }

  ngOnInit(): void {
    this.getUserList();
    this.getReasonList();
    this.setForm();
    this.filteredUsers = this.allUsers;
  }

  async getUserList() {
    this.allUsers = [
      {
        user_id: '1',
        email: 'john@gmail.com',
        company: 'AM123',
        reason: 'Meeting',
        chekinStatus: 0,
        username: 'Moses Jmaes'
      },
      {
        user_id: '2',
        email: 'peter@gmail.com',
        company: '12Vmk',
        reason: 'Meeting',
        chekinStatus: 1,
        username: 'Philip  Nyanchoka'
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
  
  


  getReasonList() {
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
  setForm() {
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

  filterVisitors() {
    this.filteredUsers = this.allUsers.filter(user => {
      const matchesSearchTerm = user.username.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesReason = this.selectedReason ? user.reason === this.selectedReason : true;
      const matchesStatus = this.selectedStatus ? user.chekinStatus == this.selectedStatus : true;
      return matchesSearchTerm && matchesReason && matchesStatus;
    });
  }

  updateChekinStatus(item) {
    item.chekinStatus = item.chekinStatus ? 0 : 1;
    this.userForm.patchValue({ 'chekinStatus': item.chekinStatus });
    this.userForm.patchValue(item);
    this.update();
  }

  read(i: any) {
    this.userForm.patchValue(i);
    this.editPopup = true;
  }

  update() {
    this.formSubmissionFlag = true;
    const formData: any = new FormData();
    formData.append('user_id', this.userForm.value.user_id);
    formData.append('roleId', this.userForm.value.roleId);
    formData.append('email', this.userForm.value.email);
    formData.append('username', this.userForm.value.username);
    formData.append('phone', this.userForm.value.phone);
    formData.append('date', this.userForm.value.date);
    formData.append('chekinStatus', this.userForm.value.chekinStatus);
    
    this.projectsService.updateUser(formData).subscribe(() => {
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
      // handle error here
    });
  }

 
delete(i: any) {
  const factory = this.cfr.resolveComponentFactory(ConfirmationComponent);
  const componentRef = this.viewContainer.createComponent(factory);
  componentRef.instance.visible = true;
  componentRef.instance.action.subscribe(x => {
  if (x) {
    this.projectsService.deleteProject(i).subscribe(() => {
      componentRef.instance.visible = false;
      Swal.fire({
        title: '',
        text: 'Project Deleted Successfully',
        icon: 'success',
        confirmButtonText: 'Close'
      });
    }, error => {
      // handle error here
      console.error(error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to delete project. Please try again later.',
        icon: 'error',
        confirmButtonText: 'Close'
      });
    });
  } else {
    // handle cancel action here
    Swal.fire({
      title: '',
      text: 'Delete action cancelled.',
      icon: 'info',
      confirmButtonText: 'Close'
    });
  }
});
}
//*/ 
 
 
}

     
