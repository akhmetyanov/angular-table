import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Column } from '../model/column';
import { Source } from '../model/source';
import { TableFilterEventService } from '../services/table-filter-event.service';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.css'],
})
export class TableFilterComponent implements OnInit {
  @Input() tableId!: number;
  @Input() column!: Column;
  source: Source | undefined;
  dataShunkToShow: any[] = [];
  filterInput: string = '';
  constructor(private filterEventService: TableFilterEventService) {}

  ngOnInit(): void {
    this.filterEventService.filterSources$.pipe(take(1)).subscribe((fs) => {
      if (!fs[this.tableId] || !fs[this.tableId][this.column.column]) return;
      this.source = fs[this.tableId][this.column.column];
      this.dataShunkToShow = this.source.current();
    });
  }
}
