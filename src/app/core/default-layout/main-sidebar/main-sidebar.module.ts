// main-sidebar.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSidebarComponent } from './main-sidebar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MainSidebarComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [MainSidebarComponent]
})
export class MainSidebarModule { }
