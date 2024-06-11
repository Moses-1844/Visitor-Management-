// src/app/modules/receptionist-dashboard/confirmation.component.ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  template: `
    <div class="modal">
      <div class="modal-content">
        <span class="close" (click)="cancel()">&times;</span>
        <p>Are you sure you want to delete this project?</p>
        <button (click)="confirm()">Yes</button>
        <button (click)="cancel()">No</button>
      </div>
    </div>
  `,
  
})
export class ConfirmationComponent {
  @Output() action = new EventEmitter<boolean>();
  visible: boolean = false;

  confirm() {
    this.action.emit(true);
    this.visible = false;
  }

  cancel() {
    this.action.emit(false);
    this.visible = false;
  }
}
