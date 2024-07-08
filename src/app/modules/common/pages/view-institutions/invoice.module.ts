import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import * as $ from 'jquery';


@NgModule({
  declarations: [
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    
  ]
})
export class InvoiceModule { }
