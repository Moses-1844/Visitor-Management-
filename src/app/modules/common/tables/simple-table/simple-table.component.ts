import { Component } from '@angular/core';

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.css']
})
export class SimpleTableComponent {
  duties: any[] = [];
  newDuty: any = {}; // Define an object to store new duty details

  // Method to add a new duty
  addDuty() {
    // Add your logic here to add the new duty to the duties list
    console.log('Adding new duty:', this.newDuty);
  }
}
