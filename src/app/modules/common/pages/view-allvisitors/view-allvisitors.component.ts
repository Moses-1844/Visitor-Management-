import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VisitorService } from '../visitor.service';

@Component({
  selector: 'app-view-allvisitors',
  templateUrl: './view-allvisitors.component.html',
  styleUrls: ['./view-allvisitors.component.css']
})
export class ViewAllVisitorsComponent implements OnInit {
  userForm: FormGroup;
  visitors: any[] = [];
  filteredVisitors: any[] = [];
  searchText: string = '';
  columnToSort: string = 'name';
  reverseSort: boolean = false;
  itemsPerPage: number = 5;

  @ViewChild('editVisitorModal') editVisitorModal!: ElementRef<HTMLDivElement>;
  @ViewChild('closeModalButton') closeModalButton!: ElementRef<HTMLButtonElement>;

  selectedVisitor: any = {
    visitorid: '',
    visitorname: '',
    company: '',
    phone_number: '',
    email: ''
  };
  editPopup: boolean = false;
  formSubmissionFlag: boolean = false;

  constructor(private cdr: ChangeDetectorRef, private visitorService: VisitorService) {
    this.userForm = new FormGroup({
      visitorid: new FormControl(''),
      visitorname: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      phone_number: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit(): void {
    this.getVisitors();
  }

  getVisitors(): void {
    this.visitorService.getVisitors().pipe(
      catchError(error => {
        console.error('Error occurred while fetching visitors: ', error);
        return of([]);
      })
    ).subscribe(visitors => {
      this.visitors = visitors;
      this.filteredVisitors = [...this.visitors];
      this.cdr.detectChanges(); // Trigger change detection manually
    });
  }

  editVisitor(visitor: any): void {
    this.selectedVisitor = { ...visitor }; // Clone the visitor data
    this.userForm.patchValue(this.selectedVisitor); // Set form values
    this.editPopup = true;
    this.openModal(); // Call method to open modal
  }

  update(): void {
    this.formSubmissionFlag = true;

    const visitorData = {
      visitorid: this.userForm.value.visitorid,
      visitorname: this.userForm.value.visitorname,
      company: this.userForm.value.company,
      phone_number: this.userForm.value.phone_number,
      email: this.userForm.value.email
    };

    this.visitorService.updateVisitor(visitorData.visitorid, visitorData).subscribe(
      () => {
        alert('Visitor updated successfully');
        this.formSubmissionFlag = false;
        this.closeModal(); // Close modal
        this.getVisitors(); // Refresh visitor list
      },
      error => {
        this.formSubmissionFlag = false;
        alert('An error occurred while updating the visitor: ' + error.message);
        console.error('Error updating visitor:', error);
      }
    );
  }

  deleteVisitor(visitor: any): void {
    this.visitorService.deleteVisitor(visitor.visitorid).subscribe(
      () => {
        this.visitors = this.visitors.filter(v => v.visitorid !== visitor.visitorid);
        this.applyFilters();
        this.cdr.detectChanges(); // Trigger change detection manually
      },
      error => {
        swal.fire('Error', 'An error occurred while deleting the visitor: ' + error.message, 'error');
      }
    );
  }

  applyFilters(): void {
    this.filteredVisitors = this.visitors.filter(visitor =>
      visitor.visitorname.toLowerCase().includes(this.searchText.toLowerCase()) ||
      visitor.company.toLowerCase().includes(this.searchText.toLowerCase()) ||
      visitor.phone_number.toLowerCase().includes(this.searchText.toLowerCase()) ||
      visitor.email.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  setItemsPerPage(num: number): void {
    this.itemsPerPage = num;
  }

  sort(columnName: string): void {
    this.columnToSort = columnName;
    this.reverseSort = !this.reverseSort;
    this.filteredVisitors.sort((a, b) => {
      const comparison = a[columnName] > b[columnName] ? 1 : -1;
      return this.reverseSort ? -comparison : comparison;
    });
  }

  openModal(): void {
    ($(this.editVisitorModal.nativeElement) as any).modal('show');
  }

  closeModal(): void {
    ($(this.editVisitorModal.nativeElement) as any).modal('hide');
  }
}
