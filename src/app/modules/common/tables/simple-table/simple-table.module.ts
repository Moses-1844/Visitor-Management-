import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SimpleTableRoutingModule } from './simple-table-routing.module';
import { SimpleTableComponent } from './simple-table.component';


@NgModule({
  declarations: [
    SimpleTableComponent
  ],
  imports: [
    CommonModule,
    SimpleTableRoutingModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    SimpleTableRoutingModule
  ]
})
export class DataTableModule { }
