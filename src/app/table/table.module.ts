import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { StoreModule } from '@ngrx/store';
import { TableRegisterService } from './services/table-register.service';

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule, StoreModule],
  exports: [TableComponent],
  providers: [TableRegisterService],
})
export class TableModule {}
