import { Injectable } from '@angular/core';
import { Column } from '../model/column';
import { ServerSideSource } from '../model/server-side-source';
import { Source } from '../model/source';
import { TableDataStoreService } from './table-data-store.service';

@Injectable()
export class TableSourceService {
  private sources: Record<number, Source> = {};
  constructor(private dataStore: TableDataStoreService) {}

  buildTableSource(tableId: number, pageSize: number) {
    const data = this.dataStore.get(tableId);
    const source = new ServerSideSource(data, pageSize);
    this.sources[tableId] = source;
    return source;
  }

  buildFilterSource(tableId: number, pageSize: number, column: Column) {
    const data = this.dataStore.get(tableId)
    const source = new ServerSideSource(data, pageSize, true) 
    const originTableSource = this.sources[tableId];
    if (originTableSource && originTableSource instanceof ServerSideSource) {
      source.filterState = originTableSource.filterState
    }
    return source;
  }
}
