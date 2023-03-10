import { Injectable } from '@angular/core';
import { Column } from '../model/column';
import { TableSourceService } from './table-source.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Source } from '../model/source';
import { SourceFilterType, SourceFilterValue } from '../model/source-filter-state';

@Injectable()
export class TableFilterEventService {
  private filterSources: Record<number, Record<string, Source>> = {};
  filterSources$: BehaviorSubject<Record<number, Record<string, Source>>> =
    new BehaviorSubject<Record<number, Record<string, Source>>>({});

  private filterEvents: Record<number, Record<string, SourceFilterValue>> = {};
  filterEvents$: BehaviorSubject<Record<number, Record<string, SourceFilterValue>>> = new BehaviorSubject<Record<number, Record<string, SourceFilterValue>>>({})
  
  closeAll$: Subject<{ tableId: number; column: Column }> = new Subject<{
    tableId: number;
    column: Column;
  }>();

  constructor(private sourceService: TableSourceService) {}

  createSource(tableId: number, column: Column) {
    if (
      this.filterSources[tableId] &&
      this.filterSources[tableId][column.column]
    ) {
      delete this.filterSources[tableId][column.column];
      this.filterSources$.next(this.filterSources);
      return;
    }

    if (!this.filterSources[tableId]) this.filterSources[tableId] = {};

    this.filterSources[tableId][column.column] =
      this.sourceService.buildFilterSource(tableId, 100, column);

    this.filterSources$.next(this.filterSources);
  }

  lastExept: { tableId: number; column: Column } | undefined;
  closeAllExept(tableId: number, column: Column) {
    if (
      this.lastExept &&
      this.lastExept.tableId == tableId &&
      this.lastExept.column == column
    ) {
      this.lastExept = { column: new Column('', ''), tableId: -1 };
    } else {
      this.lastExept = { column: column, tableId: tableId };
    }
    this.closeAll$.next(this.lastExept);
  }

  registerEvent(tableId: number, column: Column, value: any) {
    if (!this.filterEvents[tableId]) this.filterEvents[tableId] = {};
    this.filterEvents[tableId][column.column] = { column: column, type: SourceFilterType.in, value: value }
    this.filterEvents$.next(this.filterEvents);
  }
}
