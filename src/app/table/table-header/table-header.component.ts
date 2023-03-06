import { Component, Input, OnInit } from '@angular/core';
import { Column } from '../model/column';
import { TableFilterEventService } from '../services/table-filter-event.service';
import { TableSourceService } from '../services/table-source.service';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.css'],
})
export class TableHeaderComponent implements OnInit {
  @Input() value!: Column;
  @Input() tableIndex!: number;

  filterPanelVisibility: boolean = false;

  constructor(private filterEventService: TableFilterEventService) {}

  ngOnInit(): void {
    this.filterEventService.closeAll$.subscribe((exept) => {
      if (exept.tableId == this.tableIndex && exept.column == this.value) {
        this.filterPanelVisibility = true;
      } else {
        this.filterPanelVisibility = false;
      }
    });
  }

  onFilterClick() {
    this.filterEventService.closeAllExept(this.tableIndex, this.value);
    this.filterEventService.createSource(this.tableIndex, this.value);
  }

  onSortClick() {}
}
