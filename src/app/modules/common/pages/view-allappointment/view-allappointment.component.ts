import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { VisitorService } from '../visitor.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-view-allappointment',
  
  templateUrl: './view-allappointment.component.html',
  styleUrl: './view-allappointment.component.css'
})
export class ViewAllappointmentComponent  implements OnInit {
    @ViewChild('closeModal', { static: false }) closeModal: ElementRef;
    isAdmin: boolean;
    VisitorInfo: any;
    userForm: FormGroup;
    allVisitors: any = [];
    filteredVisitors: any = [];
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
    errorMessage: string = '';
  
    constructor(
      private http: HttpClient,
      private visitorService: VisitorService,
      private authService: AuthService
    ) {
      const userRole = this.authService.getRole();
      this.isAdmin = userRole === 'admin';
    }
  
    ngOnInit(): void {
      this.institutionId = Number(localStorage.getItem('institutionId'));
      this.getVisitorList();
      this.getDepartmentList();
      this.setForm();
      this.filteredVisitors = this.allVisitors;
      this.userForm.get('searchTerm').valueChanges.subscribe(() => this.filterVisitors());
      this.userForm.get('selectedDepartment').valueChanges.subscribe(() => this.filterVisitors());
      this.userForm.get('selectedStatus').valueChanges.subscribe(() => this.filterVisitors());
    }
  
    async getVisitorList() {
       
        this.visitorService.getAppointments().subscribe(
          (appointments) => {
            console.log('Appointments:', appointments);
            this.allVisitors = appointments;
            this.filteredVisitors = this.allVisitors;
          },
          (error) => {
            alert('An error occurred while fetching appointments. Please try again.');
            console.error('Error fetching appointments:', error);
          }
        );
      } 
    
  
    getDepartmentList() {
       
        const url = `https://mrvisitease.com:8080/api/institutions`;
        this.http.get<any>(url, { responseType: 'json' }).subscribe(
          (response) => {
            this.department = response.map(dept => dept.name);
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
        department: new FormControl(null, [Validators.required])
      });
    }
  
    filterVisitors() {
      this.filteredVisitors = this.allVisitors.filter(visitor => {
        return (
          (this.searchTerm ? visitor.visitor.appointmentid.toLowerCase().includes(this.searchTerm.toLowerCase()) : true) &&
          (this.selectedDepartment ? visitor.institution.name === this.selectedDepartment : true) &&
          (this.selectedStatus ? visitor.appointmentstatus  === this.selectedStatus : true)
        );
      });
    }
  
     
  
    read(i: any) {
      this.userForm.patchValue(i);
      this.editPopup = true;
    }
  
    update(): void {
      this.formSubmissionFlag = true;
  
      const visitorData = {
        email: this.userForm.value.email,
        username: this.userForm.value.username,
        phone: this.userForm.value.phone,
        department: this.userForm.value.department,
        company: this.userForm.value.company
      };
  
      this.visitorService.updateVisitor(this.id, visitorData).subscribe(
        () => {
          Swal.fire({
            title: '',
            text: 'User updated Successfully',
            icon: 'success',
            confirmButtonText: 'Close'
          });
          this.formSubmissionFlag = false;
          this.closeModal.nativeElement.click();
        },
        error => {
          this.formSubmissionFlag = false;
          console.error('Error updating user:', error);
        }
      );
    }
  
    exportAsCSV() {
      this.http.get('api/report', { responseType: 'blob' }).subscribe(data => {
        const blob = new Blob([data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'report.csv';
        link.click();
      });
    }
  
    exportAsPDF() {
      this.http.get('api/report', { responseType: 'blob' }).subscribe(data => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'report.pdf';
        link.click();
      });
    }
  
  
}
