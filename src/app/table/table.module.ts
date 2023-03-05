import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { StoreModule } from '@ngrx/store';
import { TableRegisterService } from './services/table-register.service';
import { TableSourceService } from './services/table-source.service';
import { TableHeaderComponent } from './table-header/table-header.component';
import { TableFilterComponent } from './table-filter/table-filter.component';

@NgModule({
  declarations: [TableComponent, TableHeaderComponent, TableFilterComponent],
  imports: [CommonModule, StoreModule],
  exports: [TableComponent],
  providers: [TableRegisterService, TableSourceService],
})
export class TableModule {}
