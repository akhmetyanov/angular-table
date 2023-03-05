import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule, StoreModule],
})
export class TableModule {}
