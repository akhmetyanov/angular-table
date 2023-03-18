import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { StoreModule } from '@ngrx/store';
import { TableRegisterService } from './services/table-register.service';
import { TableSourceService } from './services/table-source.service';
import { TableHeaderComponent } from './table-header/table-header.component';
import { TableFilterComponent } from './table-filter/table-filter.component';
import { TableFilterEventService } from './services/table-filter-event.service';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [TableComponent, TableHeaderComponent, TableFilterComponent],
  imports: [
    CommonModule,
    StoreModule,
    FormsModule,
    InputTextModule,
    CheckboxModule,
    InfiniteScrollModule
  ],
  exports: [TableComponent],
  providers: [
    TableRegisterService,
    TableSourceService,
    TableFilterEventService,
  ],
})
export class TableModule {}
