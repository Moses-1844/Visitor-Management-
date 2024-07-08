import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { VisitorService } from '../visitor.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-view-appointmment',
  templateUrl: './view-appointmment.component.html',
  styleUrls: ['./view-appointmment.component.css']
})
export class ViewAppointmmentComponent implements OnInit {
  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;
  isAdmin: boolean;
  userForm: FormGroup;
  allVisitors: any[] = [];
  filteredVisitors: any[] = [];
  errors: any = [];
  formError: any = {};
  message: string; 
  id: any;
  serverError: boolean;
  editPopup: boolean;
  formSubmissionFlag: boolean = false;
  department: string[] = [];
  searchTerm: string = '';
  selectedDepartment: string = '';
  selectedStatus: string = '';
  institutionId: number;
  errorMessage: string;
  
  constructor(
    private http: HttpClient,
    private visitorService: VisitorService,
    private authService: AuthService
  ) {
    const userRole = this.authService.getRole();
    this.isAdmin = userRole === 'admin';
  }

  ngOnInit(): void {
    this.getVisitorList();
    this.getDepartmentList();
    this.setForm();
    this.filteredVisitors = this.allVisitors;
  }

  async getVisitorList() {
    const institutionId = Number(localStorage.getItem('institutionId'));
    if (institutionId) {
      this.visitorService.getAppointmentsByInstitutionId(institutionId).subscribe(
        (appointments) => {
          this.allVisitors = appointments;
          this.filteredVisitors = this.allVisitors;
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

  getDepartmentList() {
    if (this.institutionId) {
      const url = `https://mrvisitease.com:8080/api/departments/institution/${this.institutionId}`;
      this.http.get<any>(url, { responseType: 'json' }).subscribe(
        (response) => {
          this.department = response.map(dept => dept.departmentname);
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

  setForm() {
    this.userForm = new FormGroup({
      visitorid: new FormControl(null),
      visitorname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      department: new FormControl(null, [Validators.required]),
      visit_status: new FormControl(null, [Validators.required])
    });
  }

  filterVisitors() {
    this.filteredVisitors = this.allVisitors.filter(visitor => {
      return (
        (this.searchTerm ? visitor?.visitor?.visitorname.toLowerCase().includes(this.searchTerm.toLowerCase()) : true) &&
        (this.selectedDepartment ? visitor?.department === this.selectedDepartment : true) &&
        (this.selectedStatus ? visitor?.visitor?.visit_status.toLowerCase() === this.selectedStatus.toLowerCase() : true)
      );
    });
  }

  read(visitor: any) {
    this.userForm.patchValue({
      visitorid: visitor?.visitor?.visitorid,
      visitorname: visitor?.visitor?.visitorname,
      email: visitor?.visitor?.email,
      department: visitor?.department,
      visit_status: visitor?.appointmentstatus
    });
    this.editPopup = true;
  }

  updateVisitor(): void {
    this.formSubmissionFlag = true;

    const visitorData = {
      visitorname: this.userForm.value.visitorname,
      email: this.userForm.value.email,
      department: this.userForm.value.department,
      visit_status: this.userForm.value.visit_status
    };

    this.visitorService.updateVisitor(this.id, visitorData).subscribe(
      (response) => {
        Swal.fire({
          title: 'Success',
          text: 'Visitor details updated successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.getVisitorList();
        this.closeModal.nativeElement.click();
        this.editPopup = false;
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while updating the visitor. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.error('Error updating visitor:', error);
      }
    );
  }

  clearForm() {
    this.userForm.reset();
    this.formSubmissionFlag = false;
    this.formError = {};
  }
}
