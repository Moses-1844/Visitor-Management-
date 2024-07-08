import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { InstitutionService } from './institution.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  editForm: FormGroup;
  banks: any[] = [];
  filteredBanks: any[] = [];
  searchText: string = '';
  columnToSort: string = 'name';
  reverseSort: boolean = false;
  itemsPerPage: number = 5;

  @ViewChild('editBankModal') editBankModal!: ElementRef<HTMLDivElement>;

  selectedBank: any = {
    id: '',
    name: '',
    address: '',
    contactNumber: '',
    email: '',
    registrationNumber: ''
  };

  constructor(private cdr: ChangeDetectorRef, private institutionService: InstitutionService) {
    this.editForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      contactNumber: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      registrationNumber: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.getBanks();
  }

  getBanks(): void {
    this.institutionService.getBanks().pipe(
      catchError(error => {
        console.error('Error occurred while fetching banks: ', error);
        return of([]);
      })
    ).subscribe(banks => {
      this.banks = banks;
      this.filteredBanks = [...this.banks];
      this.cdr.detectChanges(); // Trigger change detection manually
    });
  }

  closeModal(): void {
    $('#editBankModal').modal('hide'); // Correctly hides the modal using jQuery
  }

  editBank(bank: any): void {
    this.selectedBank = { ...bank }; // Clone the bank data
    this.editForm.patchValue(this.selectedBank); // Set form values
    this.openModal(); // Call method to open modal
  }

  openModal(): void {
    $('#editBankModal').modal('show'); // Use jQuery to show the modal
  }

  saveBank(): void {
    console.log('saveBank called');
    if (this.editForm.valid) {
      console.log('Form is valid');
      const editedBankDetails = this.editForm.value;
      console.log('Edited Bank Details:', editedBankDetails);
      this.institutionService.saveBank(editedBankDetails).subscribe(
        response => {
          console.log('Bank saved successfully:', response);
          swal.fire('Success', 'Bank details saved successfully!', 'success');
          this.getBanks(); // Refresh the bank list
          this.closeModal(); // Close the modal after saving
        },
        error => {
          console.error('Error saving bank: ', error);
          let errorMessage = 'An error occurred while saving the bank. Please try again later.';
          if (error.status === 400) {
            errorMessage = 'Invalid data. Please check the input fields.';
          } else if (error.status === 500) {
            errorMessage = 'Server error. Please contact support.';
          }
          swal.fire('Error', errorMessage, 'error');
        }
      );
    } else {
      console.warn('Form is invalid');
      let validationMessage = 'Please fill out all required fields correctly:';
      if (this.editForm.controls.name.errors) {
        validationMessage += '\n- Name is required.';
      }
      if (this.editForm.controls.address.errors) {
        validationMessage += '\n- Address is required.';
      }
      if (this.editForm.controls.contactNumber.errors) {
        validationMessage += '\n- Contact number is required.';
      }
      if (this.editForm.controls.email.errors) {
        if (this.editForm.controls.email.errors.required) {
          validationMessage += '\n- Email is required.';
        }
        if (this.editForm.controls.email.errors.email) {
          validationMessage += '\n- Enter a valid email.';
        }
      }
      if (this.editForm.controls.registrationNumber.errors) {
        validationMessage += '\n- Registration number is required.';
      }
      swal.fire('Validation Error', validationMessage, 'warning');
    }
  }

  deleteBank(bank: any): void {
    this.institutionService.deleteBank(bank.id).subscribe(
      () => {
        this.banks = this.banks.filter(b => b.id !== bank.id);
        this.applyFilters();
        this.cdr.detectChanges(); // Trigger change detection manually
      },
      error => {
        swal.fire('Error', 'An error occurred while deleting the bank: ' + error.message, 'error');
      }
    );
  }

  applyFilters(): void {
    this.filteredBanks = this.banks.filter(bank =>
      bank.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      bank.address.toLowerCase().includes(this.searchText.toLowerCase()) ||
      bank.contactNumber.toLowerCase().includes(this.searchText.toLowerCase()) ||
      bank.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
      bank.registrationNumber.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  setItemsPerPage(num: number): void {
    this.itemsPerPage = num;
  }

  sort(columnName: string): void {
    this.columnToSort = columnName;
    this.reverseSort = !this.reverseSort;
    this.filteredBanks.sort((a, b) => {
      const comparison = a[columnName] > b[columnName] ? 1 : -1;
      return this.reverseSort ? -comparison : comparison;
    });
  }
}
